import "dotenv/config";

const BASE_URL = `http://localhost:${process.env.PORT ?? 5000}/api`;

let authCookie = "";
let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
    totalTests++;
    if (!condition) {
        console.error(`❌ FAILED: ${message}`);
        throw new Error(`Assertion failed: ${message}`);
    }
    passedTests++;
    console.log(`✅ PASSED: ${message}`);
}

async function testHealth() {
    console.log("\n--- Testing Health Check ---");
    const res = await fetch(`${BASE_URL}/health`);
    assert(res.status === 200, "Health check returns 200 OK");
    const data = await res.json();
    assert(data.status === "ok", "Health status is 'ok'");
}

async function testAuthValidation() {
    console.log("\n--- Testing Auth Validation ---");

    // 1. Missing fields
    const res1 = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    });
    assert(res1.status === 400, "Login with empty body returns 400");
    const data1 = await res1.json();
    assert(data1.error === "Email and password are required.", "Error message for empty login is correct");

    // 2. Invalid user
    const res2 = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "nobody@loopr.dev", password: "Password123" }),
    });
    assert(res2.status === 401, "Login with non-existent user returns 401");

    // 3. Wrong password
    const res3 = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "analyst@loopr.dev", password: "WrongPassword" }),
    });
    assert(res3.status === 401, "Login with wrong password returns 401");

    // 4. Valid login
    const res4 = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "analyst@loopr.dev", password: "Loopr@12345" }),
    });
    assert(res4.status === 200, "Login with valid credentials returns 200");
    const data4 = await res4.json();
    assert(data4.user.email === "analyst@loopr.dev", "User email matches in login response");
    assert(data4.user.role === "analyst", "User role is analyst");
    assert(data4.user.name === "Jitesh Borse", "User name matches profile in login response");
    assert(data4.user.location === "Pune, Maharashtra", "User location matches profile in login response");
    assert(Boolean(data4.user.lastLogin), "User lastLogin timestamp is present in login response");

    // Extract cookie
    const setCookie = res4.headers.get("set-cookie");
    assert(setCookie !== null && setCookie.includes("accessToken="), "HttpOnly accessToken cookie set");
    authCookie = setCookie?.split(";")[0] ?? "";

    // 5. Protected route without cookie
    const res5 = await fetch(`${BASE_URL}/auth/me`);
    assert(res5.status === 401, "/auth/me without cookie returns 401");

    // 6. Protected route with cookie
    const res6 = await fetch(`${BASE_URL}/auth/me`, {
        headers: { Cookie: authCookie },
    });
    assert(res6.status === 200, "/auth/me with cookie returns 200");
    const data6 = await res6.json();
    assert(data6.user.email === "analyst@loopr.dev", "/auth/me returns authenticated analyst user");
    assert(data6.user.name === "Jitesh Borse", "/auth/me returns user name");
    assert(data6.user.location === "Pune, Maharashtra", "/auth/me returns user location");
    assert(Boolean(data6.user.lastLogin), "/auth/me returns user lastLogin timestamp");
}

async function testAnalytics() {
    console.log("\n--- Testing Analytics & Aggregations ---");

    // 1. Overall Summary
    const res1 = await fetch(`${BASE_URL}/analytics/summary`, {
        headers: { Cookie: authCookie },
    });
    assert(res1.status === 200, "Analytics summary returns 200");
    const summary = await res1.json();
    assert(summary.revenue === "339803.25", `Summary revenue matches assignment exact ($339,803.25) [got: ${summary.revenue}]`);
    assert(summary.expenses === "206605.00", `Summary expenses match assignment exact ($206,605.00) [got: ${summary.expenses}]`);
    assert(summary.net === "133198.25", `Summary net matches assignment exact ($133,198.25) [got: ${summary.net}]`);
    assert(summary.transactionCount === 300, `Summary transaction count is 300 [got: ${summary.transactionCount}]`);
    assert(!Number.isNaN(Number(summary.pending)), "Summary pending amount is a valid number");

    // 2. Filtered Summary (Revenue only)
    const resRev = await fetch(`${BASE_URL}/analytics/summary?category=Revenue`, {
        headers: { Cookie: authCookie },
    });
    const revSummary = await resRev.json();
    assert(revSummary.revenue === "339803.25", "Revenue-only filter gives $339,803.25");
    assert(Number(revSummary.expenses) === 0, "Revenue-only filter gives 0 expenses");
    assert(revSummary.transactionCount === 150, "Revenue-only filter gives 150 transactions");

    // 3. Filtered Summary (Expense only)
    const resExp = await fetch(`${BASE_URL}/analytics/summary?category=Expense`, {
        headers: { Cookie: authCookie },
    });
    const expSummary = await resExp.json();
    assert(Number(expSummary.revenue) === 0, "Expense-only filter gives 0 revenue");
    assert(expSummary.expenses === "206605.00", "Expense-only filter gives $206,605.00 expenses");
    assert(expSummary.transactionCount === 150, "Expense-only filter gives 150 transactions");

    // 4. Trends
    const res2 = await fetch(`${BASE_URL}/analytics/trends`, {
        headers: { Cookie: authCookie },
    });
    assert(res2.status === 200, "Analytics trends returns 200");
    const trends = await res2.json();
    assert(Array.isArray(trends.data) && trends.data.length > 0, "Trends data is a non-empty array");
    const sampleTrend = trends.data[0];
    assert(typeof sampleTrend.month === "string" && sampleTrend.month.includes("-"), "Trend point has YYYY-MM format");
    assert(typeof sampleTrend.revenue === "string", "Trend point has string revenue");
    assert(typeof sampleTrend.expenses === "string", "Trend point has string expenses");

    // 5. Breakdown
    const res3 = await fetch(`${BASE_URL}/analytics/breakdown`, {
        headers: { Cookie: authCookie },
    });
    assert(res3.status === 200, "Analytics breakdown returns 200");
    const breakdown = await res3.json();
    assert(Array.isArray(breakdown.category), "Breakdown has category array");
    assert(Array.isArray(breakdown.status), "Breakdown has status array");

    const totalCategoryCount = breakdown.category.reduce((sum: number, c: any) => sum + c.count, 0);
    assert(totalCategoryCount === 300, `Category counts sum to 300 [got: ${totalCategoryCount}]`);

    const totalStatusCount = breakdown.status.reduce((sum: number, s: any) => sum + s.count, 0);
    assert(totalStatusCount === 300, `Status counts sum to 300 [got: ${totalStatusCount}]`);

    const paidStatus = breakdown.status.find((s: any) => s.name === "Paid");
    const pendingStatus = breakdown.status.find((s: any) => s.name === "Pending");
    assert(paidStatus?.count === 186, `Paid count is 186 [got: ${paidStatus?.count}]`);
    assert(pendingStatus?.count === 114, `Pending count is 114 [got: ${pendingStatus?.count}]`);
}

async function testTransactions() {
    console.log("\n--- Testing Transactions API ---");

    // 1. Default Paginated Query
    const res1 = await fetch(`${BASE_URL}/transactions`, {
        headers: { Cookie: authCookie },
    });
    assert(res1.status === 200, "Transactions default query returns 200");
    const json1 = await res1.json();
    assert(json1.meta.total === 300, `Total transactions is 300 [got: ${json1.meta.total}]`);
    assert(json1.meta.page === 1, "Default page is 1");
    assert(json1.meta.pageSize === 25, "Default pageSize is 25");
    assert(json1.meta.totalPages === 12, "Default totalPages is 12 (300 / 25)");
    assert(json1.meta.hasNextPage === true, "Page 1 has next page");
    assert(json1.meta.hasPreviousPage === false, "Page 1 has no previous page");
    assert(json1.data.length === 25, "Returns 25 records on page 1");

    // Check Decimal128 amount string formatting
    const firstTx = json1.data[0];
    assert(typeof firstTx.amount === "string" && !firstTx.amount.includes("object"), `Transaction amount is a clean string [got: ${firstTx.amount}]`);
    assert(!Number.isNaN(Number(firstTx.amount)), "Transaction amount converts cleanly to number");

    // 2. Default Sort is Date Descending
    const date1 = new Date(json1.data[0].date).getTime();
    const date2 = new Date(json1.data[1].date).getTime();
    assert(date1 >= date2, "Default sorting is date descending");

    // 3. Clamping & Boundaries
    const resClamp = await fetch(`${BASE_URL}/transactions?page=-5&pageSize=500`, {
        headers: { Cookie: authCookie },
    });
    const jsonClamp = await resClamp.json();
    assert(jsonClamp.meta.page === 1, "Negative page clamped to 1");
    assert(jsonClamp.meta.pageSize === 100, "Large pageSize clamped to 100");
    assert(jsonClamp.data.length === 100, "Returns 100 records when clamped to 100");

    // 4. Page out of range
    const resEmpty = await fetch(`${BASE_URL}/transactions?page=99`, {
        headers: { Cookie: authCookie },
    });
    const jsonEmpty = await resEmpty.json();
    assert(jsonEmpty.data.length === 0, "Page beyond total returns empty array");
    assert(jsonEmpty.meta.hasNextPage === false, "Last page hasNextPage is false");

    // 5. User ID Filter
    const resUser = await fetch(`${BASE_URL}/transactions?userId=user_001&pageSize=100`, {
        headers: { Cookie: authCookie },
    });
    const jsonUser = await resUser.json();
    assert(jsonUser.data.every((t: any) => t.user_id === "user_001"), "All records match filtered user_id: user_001");

    // 6. Category Filter
    const resCat = await fetch(`${BASE_URL}/transactions?category=Revenue&pageSize=100`, {
        headers: { Cookie: authCookie },
    });
    const jsonCat = await resCat.json();
    assert(jsonCat.data.every((t: any) => t.category === "Revenue"), "All records match filtered category: Revenue");
    assert(jsonCat.meta.total === 150, "Revenue total records is exactly 150");

    // 7. Status Filter
    const resStatus = await fetch(`${BASE_URL}/transactions?status=Paid&pageSize=100`, {
        headers: { Cookie: authCookie },
    });
    const jsonStatus = await resStatus.json();
    assert(jsonStatus.data.every((t: any) => t.status === "Paid"), "All records match filtered status: Paid");
    assert(jsonStatus.meta.total === 186, "Paid total records is exactly 186");

    // 8. Amount Range Filter
    const resAmount = await fetch(`${BASE_URL}/transactions?minAmount=1000&maxAmount=2000`, {
        headers: { Cookie: authCookie },
    });
    const jsonAmount = await resAmount.json();
    assert(
        jsonAmount.data.every((t: any) => Number(t.amount) >= 1000 && Number(t.amount) <= 2000),
        "All records are between $1,000 and $2,000"
    );

    // 9. Numeric ID Search
    const resSearch = await fetch(`${BASE_URL}/transactions?search=100`, {
        headers: { Cookie: authCookie },
    });
    const jsonSearch = await resSearch.json();
    assert(jsonSearch.data.some((t: any) => t.id === 100), "Search by ID 100 returns record with id 100");

    // 10. Amount Sort Descending
    const resSortAmt = await fetch(`${BASE_URL}/transactions?sortBy=amount&sortOrder=desc`, {
        headers: { Cookie: authCookie },
    });
    const jsonSortAmt = await resSortAmt.json();
    const amt1 = Number(jsonSortAmt.data[0].amount);
    const amt2 = Number(jsonSortAmt.data[1].amount);
    assert(amt1 >= amt2, `Amount sort descending verified ($${amt1} >= $${amt2})`);
}

async function testLogout() {
    console.log("\n--- Testing Logout Flow ---");
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { Cookie: authCookie },
    });
    assert(res.status === 200, "Logout returns 200");
    const setCookie = res.headers.get("set-cookie");
    assert(setCookie !== null && (setCookie.includes("accessToken=;") || setCookie.includes("Max-Age=0")), "Cookie cleared on logout");
}

async function runAllTests() {
    console.log("==========================================");
    console.log("   LOOPR BACKEND API VERIFICATION SUITE   ");
    console.log("==========================================");

    try {
        await testHealth();
        await testAuthValidation();
        await testAnalytics();
        await testTransactions();
        await testLogout();

        console.log("\n==========================================");
        console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED PERFECTLY!`);
        console.log("==========================================");
        process.exit(0);
    } catch (err) {
        console.error("\n❌ Verification suite halted with error:", err);
        console.log(`Score: ${passedTests}/${totalTests} passed.`);
        process.exit(1);
    }
}

runAllTests();

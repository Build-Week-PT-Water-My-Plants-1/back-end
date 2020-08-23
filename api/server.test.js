describe("server.js", () => {
  test("should be in testing mode", async () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

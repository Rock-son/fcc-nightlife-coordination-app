const expect = require("expect"),
      sinon = require("sinon"),
      rewire = require("rewire"),
      
      app = rewire("./utils/app");



describe("App", () => {
    // REPLACE: db func
    const db = {
        saveUser: sinon.spy()
    }
    // REPLACE DB FUNC: with our db spy
    app.__set__("db", db)


    it("should call the spy correctly", () => {
        const spy = sinon.spy();
        spy("Andrew", 25);
        expect(spy.calledWith("Andrew", 25)).toBe(true);
    });

    it("should call user with user object", () => {
        const email = "andrew.m@example.com",
              password = "123abc";
        
        app.handleSignup(email, password);
        expect(db.saveUser.calledWith({email, password})).toBe(true);
    });
});
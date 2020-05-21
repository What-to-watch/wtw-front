import { Spy } from "./spy";

describe("Spy", () => {
    it("should wrap a function and call it, passing arguments, returning the result",() => {
        let x = 0;
        const addToXReturn42 = (y) => { 
            x = x + y; 
            return 42 
        }
        const addSpy = Spy(addToXReturn42);
        const res = addSpy(5);

        expect(res).toBe(42);
        expect(x).toBe(5);
    })

    it("should save succesive call arguments in order",() => {
        const testSpy = Spy();
        for (let index = 0; index < 5; index++) {
            testSpy(index)
        }
        expect(testSpy.calls.flatMap(x => x.args)).toStrictEqual([0,1,2,3,4]);
    })

    it("attribute 'called' should be true after one call", () => {
        const testSpy = Spy();
        expect(testSpy.called).toBeFalsy();
        testSpy();
        expect(testSpy.called).toBeTruthy();
    })

    it("should have reset function that erases call history", () => {
        const just42 = () => 42;
        const testSpy = Spy(just42);
        testSpy();

        expect(testSpy.called).toBeTruthy();
        expect(testSpy.calls).toHaveLength(1);
        expect(testSpy.callCount).toBe(1)
        const shouldBeJust42 = testSpy.reset();
        expect(shouldBeJust42).toBe(just42);
        expect(testSpy.called).toBeFalsy();
        expect(testSpy.calls).toHaveLength(0);
        expect(testSpy.callCount).toBe(0)
    })

    it("should count the amount of calls", () => {
        const testSpy = Spy();
        const expected = Math.floor((Math.random() * 10) + 1);
        for (let index = 0; index < expected; index++) {
            testSpy(index)
        }
        expect(testSpy.callCount).toBe(expected)
    })

    it("should allow asking if returned a value (uses deep equals)", () => {
        const testSpy = Spy(() => 42);
        const otherSpy = Spy(() => ({ some: "object" }))
        testSpy();
        otherSpy()

        expect(testSpy.returned(42)).toBeTruthy();
        expect(testSpy.returned(43)).toBeFalsy();
        expect(otherSpy.returned({ some: "object" })).toBeTruthy();
    })

    it("should allow to ask if returned on a call to call basis", () => {
        const weirdFn = (() => {
            let i = -1;
            return () => { i++; return i%2 == 0 ? 42: 60}
        })()
        const testSpy = Spy(weirdFn);
        testSpy();
        testSpy();
        expect(testSpy.firstCall.returned(42)).toBeTruthy();
        expect(testSpy.secondCall.returned(60)).toBeTruthy();
        expect(testSpy.thirdCall.reached).toBeFalsy();
        expect(testSpy.thirdCall.returned()).toBeFalsy();
    })

    it("should allow asking if called with certain arguments", () => {
        const testSpy = Spy();
        testSpy(42)
        testSpy({ some: "object" })
        testSpy(1,2,3,4)

        expect(testSpy.calledWith(42)).toBeTruthy()
        expect(testSpy.calledWith({ some: "object" })).toBeTruthy()
        expect(testSpy.calledWith(1,2,3,4)).toBeTruthy();
        expect(testSpy.calledWith(2,4,6,8)).toBeFalsy()
    })

    it("should allow asking if applied with certain arguments as array", () => {
        const testSpy = Spy();
        testSpy(42)
        testSpy({ some: "object" })
        testSpy(1,2,3,4)

        expect(testSpy.appliedWith([42])).toBeTruthy()
        expect(testSpy.appliedWith([{ some: "object" }])).toBeTruthy()
        expect(testSpy.appliedWith([1,2,3,4])).toBeTruthy();
        expect(testSpy.appliedWith([2,4,6,8])).toBeFalsy()
    })

    it("should have semantic access from 1st to 4th call", () => {
        const testSpy = Spy();
        for (let index = 0; index < 4; index++) {
            testSpy(index)
        }
        expect(testSpy.firstCall).toBeDefined()
        expect(testSpy.secondCall).toBeDefined()
        expect(testSpy.thirdCall).toBeDefined()
        expect(testSpy.fourthCall).toBeDefined()
    })
})
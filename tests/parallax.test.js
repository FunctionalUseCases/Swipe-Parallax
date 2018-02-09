import {Parallax} from '../src/model/Parallax';
import {Container} from '../src/model/Container';

describe('Parallax', () => {
    describe('Given I haven\'t started the app', () => {
        describe('When starting the app', () => {

            let app = Parallax.start({
                viewportHeight: 768
            });

            test('Then it should create a Container instance', () => {
                expect(app).toBeInstanceOf(Container);
            });

            test('But the container should have zero sections', () => {
                expect(app.sections.length).toEqual(0);
            });

            test('And it should know the height of the viewport', () => {
                expect(app.viewportHeight).toEqual(768);
            });

            test('And viewportHeight must be an integer', () => {
                expect(() => {
                    let app = Parallax.start({
                        viewportHeight: '768px'
                    })
                }).toThrow(Error);
            });

            test('And it must throw an error if a viewport height is not provided', () => {
                expect(() => {
                    let app = Parallax.start({});
                }).toThrow(Error);
            });
        });
    });

    describe('Given I have started the app', () => {

        let state = Parallax.start({
            viewportHeight: 768
        });

        describe('When a section is added', () => {
            let updatedState = Parallax.addSection(state, {
                height: 768
            });

            test('Then it should have one section', () => {
                expect(updatedState.sections.length).toEqual(1);
            });

            test('And it must have a height declaration', () => {
                expect(updatedState.sections[0].height).toEqual(768);
            });

            test('And the only section should have an offset of zero', () => {
                expect(updatedState.sections[0].offset).toEqual(0);
            });

            describe('But if height is not provided', () => {
                test('It should throw an error', () => {
                    expect(() => {
                        let updatedState = Parallax.addSection(state, {});
                    }).toThrow(Error);
                });
            });
        });

        describe('When two sections are added', () => {
            let updatedState = Parallax.addSection(state, { height: 768 });
                updatedState = Parallax.addSection(updatedState, { height: 768 });

            test('Then it should have two sections', () => {
                expect(updatedState.sections.length).toEqual(2);
            });

        });

        describe('When five sections are added', () => {
            let updatedState = Parallax.addSection(state, { height: 768 });
                updatedState = Parallax.addSection(updatedState, { height: 768 });
                updatedState = Parallax.addSection(updatedState, { height: 768 });
                updatedState = Parallax.addSection(updatedState, { height: 768 });
                updatedState = Parallax.addSection(updatedState, { height: 768 });

            test('Then it should have five sections', () => {
                expect(updatedState.sections.length).toEqual(5);
            });
        })

    });

    describe('Given the viewport is 768px', () => {

        let state = Parallax.start({
            viewportHeight: 768
        });

        describe('And the 1st section is the same height as the viewport', () => {
                state = Parallax.addSection(state, { height: 768 });

            describe('And the 2nd section is the same height as the viewport', () => {
                let updatedState = Parallax.addSection(state, { height: 768 });

                test('Then the 2nd section offset should be zero', () => {
                    expect(updatedState.sections[1].offset).toEqual(0);
                });
            });

            describe('And the second section is taller than the viewport', () => {
                let updatedState = Parallax.addSection(state, { height: 1000 });

                test('Then the second section offset should also be zero', () => {
                    expect(updatedState.sections[1].offset).toEqual(0);
                });
            });

            describe('And the second section is shorter than the viewport at 300px', () => {
                let updatedState = Parallax.addSection(state, { height: 300 });

                test('Then the second section offset should be 468px', () => {
                    expect(updatedState.sections[1].offset).toEqual(468);
                });
            });
        });

    });

});
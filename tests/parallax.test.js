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

            test('And it should have a default scroll position set', () => {
                expect(app.scrollY).toEqual(0);
            });

            test('And it should accept non default scroll number', () => {
                let app = Parallax.start({
                    viewportHeight: 768,
                    scrollY: 100
                });
                expect(app.scrollY).toEqual(100);
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

            describe('But if the current state is not an instance of a Container', () => {
                test('It should throw an error', () => {
                    expect(() => {
                        let updatedState = Parallax.addSection({}, { height: 100 });
                    }).toThrow(Error, /Should be an instance of a container/);
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

    describe('Given we add 2 sections', () => {
        describe('And the viewport is 768px', () => {

            let state = Parallax.start({
                viewportHeight: 768
            });
    
            describe('When the 1st section is the same height as the viewport', () => {
                    state = Parallax.addSection(state, { height: 768 });
    
                describe('And the 2nd section is the same height as the viewport', () => {
                    let updatedState = Parallax.addSection(state, { height: 768 });
    
                    test('Then the 2nd section offset should be zero', () => {
                        expect(updatedState.sections[1].offset).toEqual(0);
                    });

                });
    
                describe('And the 2nd section is taller than the viewport', () => {
                    let updatedState = Parallax.addSection(state, { height: 1000 });
    
                    test('Then the 2nd section offset should also be zero', () => {
                        expect(updatedState.sections[1].offset).toEqual(0);
                    });
                });
    
                describe('And the 2nd section is shorter than the viewport at 300px', () => {
                    let updatedState = Parallax.addSection(state, { height: 300 });
    
                    test('Then the 2nd section offset should be 468px', () => {
                        expect(updatedState.sections[1].offset).toEqual(468);
                    });
                });
    
            });
    
        });
    
        describe('And the viewport is 768px', () => {
    
            let state = Parallax.start({
                viewportHeight: 768
            });
    
            describe('When the 1st section is taller than the viewport', () => {
                state = Parallax.addSection(state, { height: 1000 });
    
                test('Then the 1st section should have an offset of 0', () => {
                    expect(state.sections[0].offset).toEqual(0);
                });
    
                describe('And the 2nd section is the same height as the viewport', () => {
                    test('Then the 2nd section should have an offset of 0', () => {
                        let updatedState = Parallax.addSection(state, { height: 768 });
                        expect(updatedState.sections[1].offset).toEqual(0);
                    });
                });
    
                describe('And the 2nd section is taller than the viewport', () => {
                    test('Then the 2nd section should have an offset of 0', () => {
                        let updatedState = Parallax.addSection(state, { height: 1000 });
    
                        expect(updatedState.sections[1].offset).toEqual(0);
                    });
                });
    
                describe('And the 2nd section is shorter than the viewport with 500px', () => {
                    test('Then the 2nd section should have an offset of 268px', () => {
                        let updatedState = Parallax.addSection(state, { height: 500 });
                        expect(updatedState.sections[1].offset).toEqual(268);
                    });
                });
            });
    
        });
    
        describe('And the viewport is 768px', () => {
    
            let state = Parallax.start({
                viewportHeight: 768
            });
    
            describe('When the 1st section is shorter than the viewport', () => {
                state = Parallax.addSection(state, { height: 100 });

                test('Then the 1st section should have an offset of zero', () => {
                    expect(state.sections[0].offset).toEqual(0);
                });

                describe('And 2nd section is the same height as the viewport', () => {
                    test('Them the 2nd section should have an offset of zero', () => {
                        let updatedState = Parallax.addSection(state, { height: 768 });
                        expect(updatedState.sections[1].offset).toEqual(0);
                    });
                });

                describe('And the 2nd section is taller than the viewport', () => {
                    test('Then the 2nd section should have an offset of zero', () => {
                        let updatedState = Parallax.addSection(state, { height: 1000 });
                        expect(updatedState.sections[1].offset).toEqual(0);
                    });
                });

                describe('And the 2nd section is shorter than the viewport with 600px', () => {
                    test('Then the 2nd section should have an offset of 168px', () => {
                        let updatedState = Parallax.addSection(state, { height: 600 });
                        expect(updatedState.sections[1].offset).toEqual(168);
                    });
                });
            });
    
        });
    });

    describe('Given we have 2 sections and viewport is 900px', () => {
        let state = Parallax.start({
            viewportHeight: 900
        });

            state = Parallax.addSection(state, { height: 900 })
            state = Parallax.addSection(state, { height: 900 });

        describe('And both heights are equal', () => {
            

           describe('When scroll position is zero', () => {
                test('Then the 1st section offset is zero', () => {
                    expect(state.sections[0].offset).toEqual(0);
                });
                test('And the 2nd section offset should equal zero', () => {
                    expect(state.sections[1].offset).toEqual(0);
                });
           });

           describe('When scroll position is 10px', () => {
                let updated = Parallax.changeScrollPosition(state, 10);
                
                test('Then scroll position should be 10px', () => {
                    expect(updated.scrollY).toEqual(10);
                });
           });
        });
    });

});
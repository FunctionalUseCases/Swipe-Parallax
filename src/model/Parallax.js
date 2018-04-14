import {Container} 
    from './Container';

export const Parallax 
    = {}

Parallax.start 
    = ({
        viewportHeight,
        scrollY = 0
    }) => {
        if (viewportHeight === undefined) {
            throw new Error('Viewport Height must be set');
        }

        if (!Number.isInteger(viewportHeight)) {
            throw new Error('Viewport height must be an integer');
        }

        return new Container({
            viewportHeight,
            scrollY
        });
    }

Parallax.addSection
    = (container, { height }) => {
        
        if (height === undefined) {
            throw new Error('Height must be provided');
        }

        if (container instanceof Container === false) {
            throw new Error('Should be an instance of a container');
        }

        let clone = new Container(container);

        let lastSection = clone.sections[clone.sections.length - 1];

        let thisSection = {
            height,
            offset: clone.sections.length === 0 ? 0 : lastSection.offset
        }
        
        if (clone.sections.length !== 0 && height < clone.viewportHeight) {
            thisSection.offset = clone.viewportHeight - height;
        }

        clone.sections = [...clone.sections, thisSection];

        return clone;
    }

Parallax.changeScrollPosition
    = (state, newScrollPosition) => {
        let clone = new Container(state);

        clone.scrollY = newScrollPosition;

        return clone;
    }
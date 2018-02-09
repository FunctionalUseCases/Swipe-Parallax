import {Container} 
    from './Container';

export const Parallax 
    = {}

Parallax.start 
    = ({
        viewportHeight
    }) => {
        if (viewportHeight === undefined) {
            throw new Error('Viewport Height must be set');
        }

        if (!Number.isInteger(viewportHeight)) {
            throw new Error('Viewport height must be an integer');
        }

        return new Container({
            viewportHeight
        });
    }

Parallax.addSection
    = (container, { height }) => {
        
        if (height === undefined) {
            throw new Error('Height must be provided');
        }

        let clone = new Container(container);

        let lastSection = clone.sections[clone.sections.length - 1];

        let thisSection = {
            height,
            offset: clone.sections.length === 0 ? 0 : lastSection.offset
        }
        
        if (height < clone.viewportHeight) {
            thisSection.offset = clone.viewportHeight - height;
        }

        clone.sections = [...clone.sections, thisSection];

        return clone;
    }
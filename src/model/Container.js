export class Container
{
    constructor({
        sections = [],
        viewportHeight,
        scrollY
    } = {}) {
        this.viewportHeight = viewportHeight;
        this.sections = sections;
        this.scrollY = scrollY;
    }
}
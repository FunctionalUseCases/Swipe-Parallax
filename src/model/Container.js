export class Container
{
    constructor({
        sections = [],
        viewportHeight
    } = {}) {
        this.viewportHeight = viewportHeight;
        this.sections = sections;
    }
}
const bottomLeft = opts => {
    const { trigger, content, viewport } = opts;
    if (
        trigger.leftBottomAnchor.x + content.width <= viewport.width &&
        trigger.leftBottomAnchor.y + content.height <= viewport.height
    ) {
        return {
            top: trigger.leftBottomAnchor.y,
            left: trigger.leftBottomAnchor.x,
        };
    }
    return false;
};

const bottomRight = opts => {
    const { trigger, content, viewport } = opts;
    if (
        trigger.rightBottomAnchor.x - content.width >= 0 &&
        trigger.leftBottomAnchor.y + content.height <= viewport.height
    ) {
        return {
            top: trigger.leftBottomAnchor.y,
            left: trigger.rightBottomAnchor.x - content.width,
        };
    }
    return false;
};

const upLeft = opts => {
    const { trigger, content, viewport } = opts;
    if (
        trigger.leftUpAnchor.x + content.width <= viewport.width &&
        trigger.leftUpAnchor.y - content.height >= 0
    ) {
        return {
            top: trigger.leftUpAnchor.y - content.height,
            left: trigger.leftBottomAnchor.x,
        };
    }
    return false;
};

const upRight = opts => {
    const { trigger, content } = opts;
    if (
        trigger.rightUpAnchor.x - content.width >= 0 &&
        trigger.rightUpAnchor.y - content.height >= 0
    ) {
        return {
            top: trigger.leftUpAnchor.y - content.height,
            left: trigger.rightUpAnchor.x - content.width,
        };
    }
    return false;
};

const resolvers = [bottomRight, bottomLeft, upRight, upLeft];

const positionResolver = opts => {
    let pos;
    resolvers.some(resolver => {
        const ret = resolver(opts);
        if (ret) {
            pos = ret;
            return true;
        }
        return false;
    });
    if (pos) {
        return pos;
    }
    return {
        top: 0,
        left: 0,
    };
};

export default positionResolver;

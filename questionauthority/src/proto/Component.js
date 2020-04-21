function Component(componentClassName, preDo, cleanupDo) {
    if (preDo instanceof ExtraneousFunction) {
        preDo.func(preDo.args);
    }
    this.__id = componentClassName + Component.count++;
    this.__children = [];
    this.__domNode;
    this.__childInsertionNodePointer;
    this.__cleanupDo = cleanupDo;

    this.remove = () => {
        cleanUp();
        removeAllChildren();
        this.__domNode.remove();
    };

    this.removeAllChildren = () => {
        this.__children.array.forEach(child => {
            child.remove();
            child = null;
        });
    };

    this.setChildInsertionNodePointer = domNode => {
        this.__domNode = domNode;
    };

    this.cleanUp = () => {
        if (cleanupDo instanceof ExtraneousFunction) {
            cleanupDo.func(cleanupDo.args);
        }
    };

    this.addChild = child => {
        if (child instanceof Component) {
            __children.push(child);
            __childInsertionNodePointer.appendChild(child);
        }
    };

    this.getChildByIndex = childIndex => {
        return __children[childIndex];
    };

    this.getChildByID = childID => {
        return __children[getChildIndex(childID)];
    }

    this.removeChildByIndex = childIndex => {
        __children[childID].remove();
        __children = __children.splice(childIndex, 1);
    };

    this.removeChildByID = childID => {
        removeChildByIndex(getChildIndex(childID));
    };

    this.getChildIndex = () => {
        let count = 0;
        for (const child of __children) {
            if (child.__id === childID) {
                return count;
            }
            count++;
        }
    };

    
}

Component.count = 0
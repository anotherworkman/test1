export function className(block, elem, mods) {
    if (typeof elem === 'string') {
        block += '__' + elem;
    } else {
        mods = elem;
    }
    return mods ? block + ' ' + stringifyMods(block, mods) : block;
}


export function stringifyMods(blockName, mods) {
    if (!mods) {
        return '';
    }
    var modNames = [];
    for (var mod in mods) { mods.hasOwnProperty(mod) && modNames.push(mod); }
    return modNames.reduce((res, modName) => {
        var value = mods[modName];
        return res + (
                value !== undefined && value !== false ?
                ' ' + blockName + '_' + modName + (value !== true ? '-' + value : '') :
                    ''
            );
    }, '');

}

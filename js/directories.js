define(['./tag', 'json!../data/getDirectories.json', 'less!../styles/directories.less'], function(tag, data) {

    document.getElementsByClassName('directories-box')[0].innerHTML = markup(data.response.directories);

    function markup(directories) {
        return (
            tag('div', 'class', 'dir',
                directories.map(function(dir) {
                    return (
                        tag('div', 'class', 'dir__item',
                            tag('a', 'href', '#' + dir.id, 'class', 'link', dir.name)
                        )
                    )
                })
            )
        )
    }
});

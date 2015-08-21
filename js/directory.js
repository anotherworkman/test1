define(['./tag', 'json!../data/getDirectory.json', 'less!../styles/directory.less'], function(tag, data) {

    document.getElementsByClassName('entries')[0].innerHTML = markup(data.response.directory);

    function markup(directory) {
        return (
            tag('table', 'class', 'entries__table', [
                tag('tr', 'class', 'entries__row', directory.fields.map(function(field) {
                    return (
                        tag('td', 'class', 'entries__cell entries__cell_header',
                            tag('div', 'class', 'entries__header', field.name)
                        )
                    );
                })),
                directory.items.map(function(item) {
                    return (
                        tag('tr', 'class', 'entries__row', directory.fields.map(function(field) {
                            var value = item[field.id];
                            if (field.type == 'FLOAT') {
                                value = value.toString().replace('.', ',');
                            }
                            if (field.id == 'name') {
                                value = tag('a', 'href', '#' + item.id, 'class', 'link', value);
                            }
                            return tag('td', 'class', 'entries__cell', value);
                        }))
                    )
                }).join('')
            ])
        )
    }
});

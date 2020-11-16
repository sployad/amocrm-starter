self.getTemplate = function (template, params, callback) {
    params = (typeof params == 'object') ? params : {};
    template = template || '';

    return self.render({
        href: '/templates/' + template + '.twig', // путь до шаблона
        base_path: self.params.path, //тут обращение к объекту виджет вернет /widgets/#WIDGET_NAME#
        load: callback //вызов функции обратного вызова
    }, params); //параметры для шаблона
}

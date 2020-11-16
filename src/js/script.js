define(['jquery'], function ($) {
    var CustomWidget = function () {
        var self = this;
        //=require Templater.js
        //=require Logger.js

        this.callbacks = {
            render: function () {
                return true;
            },
            init: function () {
                return true;
            },
            bind_actions: function () {
                Logger.log('BIND WIDGET ACTIONS');
                return true;
            },
            settings: function ($modal_body) { //$modal_body - jquery-объект блока правой части модального окна виджета

                self.getTemplate(
                    'oferta',
                    {},
                    function (template) {
                        $modal_body.find('input[name="oferta"]').val(''); // очищаем принудительно поле oferta
                        Logger.log('RENDER OFERTA');
                        $modal_body.find('.widget_settings_block').append(template.render()); // отрисовываем шаблон и добавляем в блок настроек виджета

                        var $install_btn = $('button.js-widget-install'),
                            $oferta_error = $('div.oferta_error');
                        $modal_body.find('input[name="oferta_check"]').on('change', function (e) {

                            var $checkbox = $(e.currentTarget);
                            if ($checkbox.prop('checked')) {
                                $modal_body.find('input[name="oferta"]').val('1'); //заполняем поле oferta, если чекбокс отмечен
                                $oferta_error.addClass('hidden'); // скрываем предупреждение, если оно отображено
                            } else {
                                $modal_body.find('input[name="oferta"]').val(''); // очищаем поле oferta, если не отмечен чекбокс
                            }
                        });
                        //при нажатии на кнопку "Установить", если не отмечен чекбокс, отображаем предупреждение
                        $install_btn.on('click', function () {
                            if (!$modal_body.find('input[name="oferta"]').val()) {
                                $oferta_error.removeClass('hidden');
                            }
                        });
                    }
                );
                return true;
            },
            onSave: function () {
                return true;
            },
            destroy: function () {
                return true;
            },
            contacts: {
                selected: function () {
                    return true;
                }
            },
            leads: {
                selected: function () {
                    return true;
                }
            },
            tasks: {
                selected: function () {
                    return true;
                }
            }
        };
        return this;
    };

    return CustomWidget;
});


;(function($, window){ 
    $('body').attr({
        oncontextmenu: 'return false',
        onselectstart: 'return false',
        ondropstart: 'return false',
        onbeforecopy: 'return false'
    });
 
    window.bsui = function(){};
    bsui.openWindow = function(options){
        var opts = $.extend({
            type: 2,
            title: '标题',
            maxmin:false,
            shadeClose:true,
            scrollbar:false,
            area: ['650px', '500px'],
            content: '/error'
        }, options || {});
        window.layer.open(opts);
    };
    bsui.setReturnValueAndText = function(frmName, ctrId, value, text){
        var jqCtrl = $('#'+ctrId, window.frames[frmName].document);
        jqCtrl.attr('data-refvalue', value).attr('data-reftext', text);
        if(jqCtrl.attr('type')==='text'){
            jqCtrl.val(text);
        }
    };
    bsui.closeWindow = function(){
        var index = parent.layer.getFrameIndex(window.name); 
        parent.layer.close(index);
    };

    bsui.openTopWindow = function(options){
        var opts = $.extend({
            type: 2,
            title: '标题',
            maxmin:false,
            shadeClose:true,
            scrollbar:false,
            area: ['750px', '530px'],
            content: '/error'
        }, options || {});
        window.top.layer.open(opts);
    };
    bsui.setTopReturnValueAndText = function(frmName, ctrId, value, text){
        var jqCtrl = $('#'+ctrId, window.top.frames[frmName].document);
        jqCtrl.attr('data-refvalue', value).attr('data-reftext', text);
        if(jqCtrl.attr('type')==='text'){
            jqCtrl.val(text);
        }
    };
    bsui.closeTopWindow = function(){
        var index = window.top.layer.getFrameIndex(window.name);
        window.top.layer.close(index);
    };

    bsui.openParentWindow = function(options){
        var opts = $.extend({
            type: 2,
            title: '标题',
            maxmin:false,
            shadeClose:true,
            scrollbar:false,
            area: ['700px', '500px'],
            content: '/error'
        }, options || {});
        window.parent.layer.open(opts);
    };
    bsui.setParentReturnValueAndText = function(frmName, ctrId, value, text){
        var jqCtrl = $('#'+ctrId, window.parent.frames[frmName].document);
        jqCtrl.attr('data-refvalue', value).attr('data-reftext', text);
        if(jqCtrl.attr('type')==='text'){
            jqCtrl.val(text);
        }
    };
    bsui.closeParentWindow = function(){
        var index = window.parent.layer.getFrameIndex(window.name);
        window.parent.layer.close(index);
    }; 
    bsui.textbox = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '',
            disabled: false,
            readonly: false,
            width: 180,
            labelWidth: 120,
            placeholder: '',
            required: false,
            singleColumn: false,
            requiredText: '此字段为必填项'
        }, options || {});
        if(options.singleColumn === true){
            options.width = 250;
        }
        var jqInput = $('<input/>',{
            'type': 'text',
            'class': 'form-control',
            'id': options.id,
            'name': options.name,
            'value': options.value,
            'disabled': options.disabled,
            'readonly': options.readonly,
            'placeholder': options.placeholder,
            'data-labelname': options.labelName,
            'data-required': options.required,
            'data-requiredtext': options.requiredText
        });
        obj.append('\n\r').append(
            $('<div>',{
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
            }).append(
                $('<label>',{
                    'for': options.id,
                    'style': 'width: ' + options.labelWidth + 'px;',
                    'class': (options.required===true ? 'bsui-required-label' : '')
                }).html(options.labelName + ':')
            ).append('\n\r').append(
                $('<div>', {
                    'class': 'bsui-input-control',
                    'style': 'width: ' + options.width + 'px;'
                }).append(
                    $('<div>', {
                        'class': 'input-group input-group-sm'
                    }).append(jqInput)
                )
            )
        ); 
        if(options.required === true){
            jqInput.on('focus', function(e){ 
                if(jqInput.hasClass('required')){
                    jqInput.removeClass('required');
                }
            }).on('blur', function(e){ 
                if($.trim(jqInput.val()) === ''){
                    jqInput.addClass('required');
                }
            });
        } 
    };
    bsui.searchbox = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '',
            text: '',
            disabled: false,
            readonly: false,
            width: 180,
            labelWidth: 120,
            placeholder: '',
            required: false,
            singleColumn: false,
            requiredText: '此字段为必选项'
        }, options || {});
        if(options.singleColumn === true){
            options.width = 250;
        }
        obj.append('\n\r').append(
            $('<fieldset>',{
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group',
                'disabled': options.disabled
             }).append(
                $('<label>',{
                    'for': options.id,
                    'style': 'width: ' + options.labelWidth + 'px;',
                    'class': (options.required===true ? 'bsui-required-label' : '')
                }).html(options.labelName + ':')
             ).append('\n\r').append(
                $('<div>', {
                    'class': 'bsui-input-control',
                    'style': 'width: ' + options.width + 'px;'
                }).append(
                    $('<div>', {
                        'class': 'input-group input-group-sm'
                    }).append(
                        $('<input/>',{
                            'type': 'text',
                            'id': options.id, 
                            'class': 'form-control',
                            'value': options.text, 
                            'readonly': options.readonly,
                            'placeholder': options.placeholder
                        })
                    ).append(
                        $('<input/>', {
                            'type': 'hidden',
                            'name': options.name,
                            'value': options.value,
                            'data-labelname': options.labelName,
                            'data-required': options.required,
                            'data-requiredtext': options.requiredText
                        })
                    ).append(
                        $('<span>', {
                            'class': 'input-group-btn'
                        }).append(
                            $('<a>', {
                                'class': 'btn btn-default'
                            }).append(
                                $('<i>', {
                                    'class': 'glyphicon glyphicon-search'
                                })
                            )
                        )
                    )
                )
            )
        ); 
    }; 
    bsui.datebox = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '',
            disabled: false,
            readonly: false,
            width: 180,
            labelWidth: 120,
            format:'yyyy-mm-dd',
            placeholder: '',
            required: false,
            singleColumn: false
        }, options || {});
        if(options.singleColumn === true){
            options.width = 250;
        }
        var jqInput = $('<input/>', {
            'type': 'text',
            'class': 'form-control',
            'id': options.id,
            'name': options.name,
            'disabled': options.disabled,
            'readonly': options.readonly,
            'value': options.value,
            'placeholder': options.placeholder
        });
        obj.append('\n\r').append(
            $('<div>', {
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
            }).append(
                $('<label>',{
                    'for': options.id,
                    'style': 'width: ' + options.labelWidth + 'px;',
                    'class': (options.required===true ? 'bsui-required-label' : '')
                }).html(options.labelName + ':')
            ).append('\n\r').append(
                $('<div>', {
                    'class': 'bsui-input-control',
                    'style': 'width: ' + options.width + 'px;'
                }).append(
                    $('<div>', {
                        'class': 'input-group input-group-sm'
                    }).append(jqInput)
                )
            )
        );
        jqInput.datepicker({
            language: 'zh-CN',
            format: options.format,
            autoclose: true
        }); 
    };
    bsui.datetimebox = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '',
            disabled: false,
            readonly: false,
            width: 180,
            labelWidth: 120,
            format: "yyyy-mm-dd hh:ii:ss",
            placeholder: '',
            required: false,
            pickerPosition: 'bottom-right',
            singleColumn: false
        }, options || {});
        if(options.singleColumn === true){
            options.width = 250;
        }
        var jqInput = $('<input/>', {
            'type': 'text',
            'class': 'form-control date',
            'id': options.id,
            'name': options.name,
            'disabled': options.disabled,
            'readonly': options.readonly,
            'value': options.value,
            'placeholder': options.placeholder
        });
        obj.append('\n\r').append(
            $('<div>', {
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
            }).append(
                $('<label>',{
                    'for': options.id,
                    'style': 'width: ' + options.labelWidth + 'px;',
                    'class': (options.required===true ? 'bsui-required-label' : '')
                }).html(options.labelName + ':')
            ).append('\n\r').append(
                $('<div>', {
                    'class': 'bsui-input-control',
                    'style': 'width: ' + options.width + 'px;'
                }).append(
                    $('<div>', {
                        'class': 'input-group input-group-sm'
                    }).append(jqInput)
                )
            )
        );
        jqInput.datetimepicker({
            language: 'zh-CN',
            format: options.format,
            autoclose: true,
            minuteStep: 10, 
            todayBtn: true,
            pickerPosition: options.pickerPosition 
        }); 
    };
    bsui.selectbox = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '', 
            disabled: false,
            width: 180,
            labelWidth: 120,
            placeholder: '',
            allowClear: false,
            data: [],
            allowAjax: false,
            url: '',
            required: false,
            multiple: false,
            singleColumn: false,
            requiredText: '此字段为必选项'
        }, options || {}); 
        if(options.singleColumn === true){
            options.width = 250;
        }
        var jqSelect = $('<select>', {
            'id': options.id,
            'name': options.name,
            'class': 'form-control',
            'disabled': options.disabled,
            'value': options.value,
            'data-labelname': options.labelName,
            'data-required': options.required,
            'data-requiredtext': options.requiredText
        });
        var jqLabel =  $('<label>', {
            'for': options.id,
            'style': 'width: ' + options.labelWidth + 'px;',
            'class': (options.required===true ? 'bsui-required-label' : '')
        }).html(options.labelName + ':');
        var jqSelectBox = $('<div>', {
            'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
        }).append(jqLabel).append('\n\r').append(
            $('<div>', {
                'class': 'bsui-input-control',
                'style': 'width: ' + options.width + 'px;'
            }).append(
                 $('<div>', {
                    'class': 'input-group input-group-sm', 
                }).append(jqSelect)
            )
        );
        obj.append('\n\r').append(jqSelectBox);
        var selectOptions = {
            language: 'zh-CN',
            minimumResultsForSearch: Infinity,
            allowClear: options.allowClear,
            multiple: options.multiple           
        };
        if(options.allowAjax){
            selectOptions.ajax = {
                url: options.url,
                processResults: function (data) { 
                  return {
                    results: data
                  };
                }
            };
            selectOptions.placeholder = {
                id: '-1', 
                text: options.placeholder
            };
        }
        else{
            selectOptions.data = options.data;
            selectOptions.placeholder = options.placeholder;
        } 
        jqSelect.select2(selectOptions);
        jqSelect.val(options.value);
        jqSelect.trigger('change.select2'); 
    };
    bsui.checkbox = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '', 
            disabled: false,
            width: 180,
            labelWidth: 120,    
            required: false,
            checked: false,
            singleColumn: false
        }, options || {}); 
        if(options.singleColumn === true){
            options.width = 250;
        }
        var jqCheckbox = $('<input/>', {
            'type': 'checkbox', 
            'id': options.id,
            'name': options.name,
            'value': options.value,
            'checked': options.checked
        });
        obj.append('\n\r').append(
            $('<div>', {
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
            }).append(
                $('<label>', {
                    'for': options.id,
                    'style': 'width: ' + options.labelWidth + 'px;',
                    'class': (options.required===true ? 'bsui-required-label' : '')
                }).html(options.labelName + ':')
            ).append('\n\r').append(
                $('<div>', {
                    'class': 'bsui-input-control',
                    'style': 'width: ' + options.width + 'px;'
                }).append(jqCheckbox)
            )
        );  
        jqCheckbox.iCheck({
            checkboxClass: 'icheckbox_minimal-blue'
        });
    };
    bsui.checkboxlist = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '', 
            disabled: false,
            width: 180,
            labelWidth: 120,    
            required: false,
            data:[],
            singleColumn: false
        }, options || {}); 
        if(options.singleColumn === true){
            options.width = 250;
        }
        var jqControls = $('<div>', {
            'class': 'bsui-input-control',
            'style': 'width: ' + options.width + 'px;'
        });
        $.each(options.data, function(i, item){
            item.checked = item.checked || false;
            var cbxId = options.name + '_' + item.value;
            jqControls.append(
                $('<span>', {
                    'class': 'bsui-checkbox-list'
                }).append(
                    $('<input/>', {
                        'type': 'checkbox',  
                        'name': options.name,
                        'value': item.value,
                        'checked': item.checked,
                        'id': cbxId
                    })
                ).append($('<label>',{
                    'for': cbxId,
                    'class': 'bsui-label'
                }).html(item.name))
            );
        }); 
        obj.append('\n\r').append(
            $('<div>', {
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
            }).append(
                $('<label>', {
                    'for': options.id,
                    'style': 'width: ' + options.labelWidth + 'px;',
                    'class': (options.required===true ? 'bsui-required-label' : '')
                }).html(options.labelName + ':')
            ).append('\n\r').append(jqControls)
        );  
        $(':checkbox[name="' + options.name + '"]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue'
        });
    };
    bsui.radiolist = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            labelName: '',
            value: '', 
            disabled: false,
            width: 180,
            labelWidth: 120,    
            required: false,
            data:[],
            singleColumn: false
        }, options || {}); 
        if(options.singleColumn === true){
            options.width = 250;
        }
        var jqControls = $('<div>', {
            'class': 'bsui-input-control',
            'style': 'width: ' + options.width + 'px;'
        });
        $.each(options.data, function(i, item){
            item.checked = item.checked || false;
            var cbxId = options.name + '_' + item.value;
            jqControls.append(
                $('<span>', {
                    'class': 'bsui-radio-list'
                }).append(
                    $('<input/>', {
                        'type': 'radio',  
                        'name': options.name,
                        'value': item.value,
                        'checked': item.checked,
                        'id': cbxId
                    })
                ).append($('<label>',{
                    'for': cbxId,
                    'class': 'bsui-label'
                }).html(item.name))
            );
        }); 
        obj.append('\n\r').append(
            $('<div>', {
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
            }).append(
                $('<label>', {
                    'for': options.id,
                    'style': 'width: ' + options.labelWidth + 'px;',
                    'class': (options.required===true ? 'bsui-required-label' : '')
                }).html(options.labelName + ':')
            ).append('\n\r').append(jqControls)
        );  
        $(':radio[name="' + options.name + '"]').iCheck({
            radioClass: 'iradio_minimal-blue'
        });
    };
    bsui.label = function(obj, options){
        options = $.extend({
            labelName: '',
            text: '',  
            width: 180,
            labelWidth: 120,
            singleColumn: false,
            value: '',
            id: '',
            name: ''
        }, options || {});
        if(options.singleColumn === true){
            options.width = 250;
        }
        obj.append('\n\r').append(
            $('<div>', {
                'class': options.singleColumn ? 'bsui-form-row' : 'bsui-form-group'
            }).append(
                $('<label>', {
                    'style': 'width: ' + options.labelWidth + 'px;'
                }).html(options.labelName + ':')
            ).append('\n\r').append(
                $('<div>', {
                    'class': 'bsui-input-control',
                    'style': 'width: ' + options.width + 'px;'
                }).append(
                    $('<input/>', {
                        'type': 'hidden',
                        'id': options.id,
                        'name': options.name,
                        'value': options.value
                    })
                ).append(
                    $('<span>').html(options.text)
                )
            )
        ); 
    };
    bsui.hiddenfield = function(obj, options){
        options = $.extend({
            id: '',
            name: '',
            value: ''
        }, options || {});
        obj.append($('<input/>', {
            id: options.id,
            name: options.name,
            value: options.value
        }));
    };
    bsui.disableButton = function(id){
        $('#' + id).attr('disabled', true).off('click');
    };
    bsui.enableButton = function(id, callback){
         $('#' + id).attr('disabled', false).on('click', callback);
    };
    bsui.validations = function(formObj){
        var errmsg = '';
        var controls = formObj.find('[data-required]');
        $.each(controls, function(i, control){
            var jqThis = $(control);
            var required = jqThis.data('required');
            if(required){
                var value = $.trim(jqThis.val());
                if(value===''){
                    errmsg += '<span style="color:#b00;">[' + jqThis.data('labelname') + ']</span> ' + jqThis.data('requiredtext') + '<br/>';
                }
            }
        }); 
        return errmsg;
    };
})(jQuery, window);
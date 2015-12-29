/**
 * Created by Zed on 2015/10/27.
 */
(function(){
    function Volume (options) {
        this.element = options.element;
        this._width = options.width;
        this._height = options.height;
        this._color = options.color || 'green';
        this._wrapStyle = options.wrap_c || '#ccc';
        this.value = options.value ? options.value : options.width * 0.5;
        this.scope_Events = {};
    }

    Volume.prototype = {
        create: function () {
            return this.init();
        },
        constructor: this,

        addEvent: function(namespacedEvent, callback) {
            this.scope_Events[namespacedEvent] = this.scope_Events[namespacedEvent] || [];
            this.scope_Events[namespacedEvent].push(callback);
            this.fireEvent(namespacedEvent,parseInt(this.colorBg.style.width));
        },
        fireEvent: function(event,handleNumber) {
            var self = this;
            Object.keys(this.scope_Events).forEach(function( targetEvent ) {

                var eventType = targetEvent.split('.')[0];

                if ( event === eventType ) {
                    self.scope_Events[targetEvent].forEach(function( callback ) {
                        callback(handleNumber);
                    });
                }
            });
        },
        removeEvent: function(namespacedEvent) {
            var event = namespacedEvent.split('.')[0],
                namespace = namespacedEvent.substring(event.length);

            Object.keys(this.scope_Events).forEach(function( bind ){

                var tEvent = bind.split('.')[0],
                    tNamespace = bind.substring(tEvent.length);

                if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
                    delete this.scope_Events[bind];
                }
            });
        },
        init: function () {
            var _wrap = document.createElement('div');
            _wrap.style.position = 'relative';
            _wrap.style.display = 'inline-block';
            _wrap.style.width = this._width + 'px';
            _wrap.style.height = this._height + 'px';
            _wrap.style.overflow = 'hidden';
            _wrap.style.borderRadius = '10px';
            _wrap.style.cursor = 'pointer';
            _wrap.style.background = this._wrapStyle;

            var _colorBg = this.colorBg = document.createElement('div');
            _colorBg.style.position = 'absolute';
            _wrap.style.display = 'inline-block';
            _colorBg.style.left = 0;
            _colorBg.style.top = 0;
            _colorBg.style.width = this.value + 'px';
            _colorBg.style.height = this._height + 'px';
            _colorBg.style.background = this._color;
            _wrap.appendChild(_colorBg);
            this.element.appendChild(_wrap);


            var self = this;


            function mousedown(e){
                self.colorBg.style.width = e.offsetX + 'px';
                //触发事件
                self.fireEvent('change',parseInt(self.colorBg.style.width));
                self._bind(document,'mousemove', mousemove)
                self._bind(document,'mouseup', mouseup)
            }
            function mousemove(e){
                self.colorBg.style.width = e.offsetX + 'px';
                //触发事件
                self.fireEvent('change',parseInt(self.colorBg.style.width));

                if (e.offsetX > self._width ||
                    e.offsetX > self._width < 0 ||
                    e.offsetY > self._height ||
                    e.offsetY > self._height < 0
                ) {
                    self._unbind(document,'mousemove', mousemove)
                    self._unbind(document,'mouseup', mouseup)
                }
            }
            function mouseup(e){

                self._unbind(document,'mousemove', mousemove)
                self._unbind(document,'mouseup', mouseup)
            }

            this._bind(_wrap,'mousedown',mousedown);


            return this;

        },
        _bind: function (element, type, handler) {
            if (element.addEventListener){
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent){
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        _unbind: function (obj,type,fn) {
            if (obj.removeEventListener)
                obj.removeEventListener( type, fn, false );
            else if (obj.detachEvent) {
                obj.detachEvent(  "on" +type, obj["e"+type+fn] );
                obj["e"+type+fn] = null;
            }
        },
        on: function (nameSpace,callback) {
            this.addEvent(nameSpace,callback)
        },
        set: function (value) {
            this.colorBg.style.width = value + 'px';
        },
        get:function () {
            return parseInt(this.colorBg.style.width);
        },
        destroy: function () {
            this.element.innnerHTML = '';
        }

    }
    window.Volume = Volume
}).call(this);
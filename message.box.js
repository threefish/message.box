/**
 * Created with IntelliJ IDEA.
 * User: 黄川
 * Date Time: 2014/12/1013:54
 */
(function (win, doc) {

    var message = new Object();

    var el = function (id) {
        if (arguments.length == 1 && doc.getElementById || typeof id == 'string') {
            return doc.getElementById(id);
        }
    }
    message.box = function () {
        var that = this;
        var box = {
            id: 'alert_' + new Date().getMilliseconds(),
            cover: ''
        };
        function addEvent(ev,el, fn, bubble) {
            if (el !== 'undefined' && typeof el === 'object') {
                el.addEventListener(ev, fn,!!bubble);
            }
        }
        /**
         * 初始化
         */
        function init(object) {
            var ops = {
                title  : object.title == undefined ? "温馨提示" : object.title,
                content: object.content,
                cover  : object.cover,
                align  : object.align,
                button : object.button
            };
            /**
             * 雾遮
             */
            if (ops.cover) {
                box.cover = 'cover_' + box.id;
                var cover = doc.createElement("cover");
                cover.id = box.cover;
                cover.setAttribute("class", "message-box_cover");
                doc.getElementsByTagName("body")[0].appendChild(cover);
            }
            var boxsub = doc.createElement("div");
            boxsub.id = box.id;
            boxsub.setAttribute("class", "message-box");

            var messagebox = doc.createElement("div");

            var title = doc.createElement("div");
            title.setAttribute("class", "message-box_title");
            title.innerText = ops.title;
            messagebox.appendChild(title);


            var contetn = doc.createElement("div");
            contetn.setAttribute("class", "message-box_content");
            contetn.style.textAlign = ops.align == '' || ops.align == undefined ? '' : ops.align;
            contetn.innerHTML = ops.content;
            messagebox.appendChild(contetn);

            if (ops.button && ops.button.length >= 1) {
                var button = doc.createElement("div");
                button.setAttribute("class", "message-box_button-box");

                if (ops.button.length == 1) {

                    var button_center = doc.createElement("span");
                    button_center.setAttribute("class", "message-box_button-button center");
                    button_center.innerText = ops.button[0].name;
                    addEvent('click', button_center, ops.button[0].fun, false);
                    button.appendChild(button_center);

                } else {

                    var button_left = doc.createElement("span");
                    button_left.setAttribute("class", "message-box_button-button left");
                    button_left.innerText = ops.button[0].name;
                    addEvent('click', button_left, ops.button[0].fun, false);
                    button.appendChild(button_left);

                    var button_right = doc.createElement("span");
                    button_right.setAttribute("class", "message-box_button-button right");
                    button_right.innerText = ops.button[1].name;
                    button.appendChild(button_right);
                    addEvent('click', button_right, ops.button[1].fun, false);

                }
                messagebox.appendChild(button);
            }else if(ops.button == undefined){
                var button = doc.createElement("div");
                button.setAttribute("class", "message-box_button-box");
                var button_center = doc.createElement("span");
                button_center.setAttribute("class", "message-box_button-button center");
                button_center.innerText = "我知道了";
                addEvent('click', button_center, function(){
                    that.hide();
                }, false);
                button.appendChild(button_center);
                messagebox.appendChild(button);
            }

            boxsub.appendChild(messagebox);
            doc.getElementsByTagName("body")[0].appendChild(boxsub);

        }

        /**
         * @param object
         * String title  标题           非必要属性
         * String cover  是否雾遮        非必要属性
         * String align  文字对齐方式    非必要属性
         * object button 按钮最大值2个   非必要属性
         */
        that.show = function (object) {
            init(object);
            if (object.cover) {
                el(box.cover).style.display = 'block';
            }
            el(box.id).style.display = 'block';
        }
        that.hide = function () {
            if (box.cover !== "") {
                el(box.cover).parentNode.removeChild(el(box.cover));
            }
            el(box.id).parentNode.removeChild(el(box.id));
        }
    }
    win.message = message;
}(window, document));
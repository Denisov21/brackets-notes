/*jslint devel: true*/
/*global define, brackets*/

define(function (require, exports, module) {
    'use strict';
    
    var dragSrcEl = null,
        dragndrop = {
            handleDragStart: function (e) {
                this.classList.add('moving');

                dragSrcEl = this;

                e.originalEvent.dataTransfer.effectAllowed = 'move';
                e.originalEvent.dataTransfer.setData('text/html', this.innerHTML);
            },

            handleDragOver: function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                e.originalEvent.dataTransfer.dropEffect = 'move';

                return false;
            },

            handleDragEnter: function (e) {
                this.classList.add('over');
            },

            handleDragLeave: function (e) {
                this.classList.remove('over');
            },

            handleDrop: function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                if (dragSrcEl !== this) {
                    dragSrcEl.innerHTML = this.innerHTML;
                    this.innerHTML = e.originalEvent.dataTransfer.getData('text/html');
                }

                return false;
            },
            
            handleDragEnd: function (elements) {
                [].map.call(elements, function (row) {
                    row.classList.remove('over');
                    row.classList.remove('moving');
                });
            }
        };
    
    exports.dragndrop = dragndrop;
});
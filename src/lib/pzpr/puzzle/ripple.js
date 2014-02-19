/*! @license pzpr.js v3.4.0 (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
pzpr.createCustoms("ripple",{MouseEvent:{mouseinput:function(){this.owner.playmode?this.mousestart&&this.inputqnum():this.owner.editmode&&(this.mousestart||this.mousemove&&this.btn.Left?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())}},KeyEvent:{enablemake:!0,enableplay:!0},Cell:{nummaxfunc:function(){return this.owner.board.rooms.getCntOfRoomByCell(this)}},Board:{hasborder:1},"Board@cojun":{qcols:8,qrows:8},AreaRoomManager:{enabled:!0},Graphic:{initialize:function(){this.Common.prototype.initialize.call(this),this.gridcolor=this.gridcolor_DLIGHT},paint:function(){this.drawBGCells(),this.drawGrid(),this.drawNumbers(),this.drawBorders(),this.drawChassis(),this.drawCursor()}},Encode:{decodePzpr:function(){this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(){this.encodeBorder(),this.encodeNumber16()},decodeKanpen:function(){this.owner.fio.decodeAreaRoom(),this.owner.fio.decodeCellQnum_kanpen()},encodeKanpen:function(){this.owner.fio.encodeAreaRoom(),this.owner.fio.encodeCellQnum_kanpen()}},FileIO:{decodeData:function(){this.decodeBorderQues(),this.decodeCellQnum(),this.decodeCellAnumsub()},encodeData:function(){this.encodeBorderQues(),this.encodeCellQnum(),this.encodeCellAnumsub()},kanpenOpen:function(){this.decodeAreaRoom(),this.decodeCellQnum_kanpen(),this.decodeCellAnum_kanpen()},kanpenSave:function(){this.encodeAreaRoom(),this.encodeCellQnum_kanpen(),this.encodeCellAnum_kanpen()}},AnsCheck:{checkAns:function(){var a=this.owner.pid,b=this.owner.board.getRoomInfo();return this.checkDiffNumberInRoom(b)?"ripple"!==a||this.checkRippleNumber()?"cojun"!==a||this.checkAdjacentDiffNumber()?"cojun"!==a||this.checkUpperNumber(b)?this.checkNoNumCell()?null:"ceEmpty":"bkSmallOnBig":"nmSameNum":"nmSmallGap":"bkDupNum"},check1st:function(){return this.checkNoNumCell()?null:"ceEmpty"},checkDiffNumberInRoom:function(a){return this.checkDifferentNumberInRoom(a,function(a){return a.getNum()})},checkAdjacentDiffNumber:function(){return this.checkSideCell(function(a,b){return a.sameNumber(b)})},checkRippleNumber:function(){for(var a=!0,b=this.owner.board,c=0;c<b.cellmax;c++){var d=b.cell[c],e=d.getNum(),f=d.bx,g=d.by;if(!(0>=e)){for(var h=2;2*e>=h;h+=2){var i=b.getc(f+h,g);if(!i.isnull&&i.getNum()===e){if(this.checkOnly)return!1;d.seterr(1),i.seterr(1),a=!1}}for(var h=2;2*e>=h;h+=2){var i=b.getc(f,g+h);if(!i.isnull&&i.getNum()===e){if(this.checkOnly)return!1;d.seterr(1),i.seterr(1),a=!1}}}}return a},checkUpperNumber:function(a){for(var b=!0,c=this.owner.board,d=0;d<c.cellmax-c.qcols;d++){var e=c.cell[d],f=e.dn(),g=f.id;if(a.id[d]==a.id[g]&&e.isNum()&&f.isNum()&&f.getNum()>e.getNum()){if(this.checkOnly)return!1;e.seterr(1),f.seterr(1),b=!1}}return b}},FailCode:{bkDupNum:["1つの部屋に同じ数字が複数入っています。","A room has two or more same numbers."],bkSmallOnBig:["同じ部屋で上に小さい数字が乗っています。","There is an small number on big number in a room."],nmSmallGap:["数字よりもその間隔が短いところがあります。","The gap of the same kind of number is smaller than the number."],ceEmpty:["数字の入っていないマスがあります。","There is an empty cell."]}});
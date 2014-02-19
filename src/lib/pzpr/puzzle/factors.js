/*! @license pzpr.js v3.4.0 (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
pzpr.createCustoms("factors",{MouseEvent:{mouseinput:function(){this.owner.playmode?this.mousestart&&this.inputqnum():this.owner.editmode&&(this.mousestart||this.mousemove?this.btn.Left&&this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())},inputqnum_main:function(a){var b=a.nummaxfunc(),c=a.numminfunc(),d=this.owner.editmode?a.getQnum():a.getAnum(),e=-1;this.btn.Left?e=d>=b?-1:-1===d?1:d+1:this.btn.Right&&(e=-1===d?b:c>=d?-1:d-1),a.setNum(e),a.draw()}},KeyEvent:{enablemake:!0,enableplay:!0},Cell:{disInputHatena:!0,nummaxfunc:function(){return this.owner.editmode?999999:Math.max(this.owner.board.qcols,this.owner.board.qrows)},setNum:function(a){0!==a&&(this.owner.editmode?this.setQnum(a):this.setAnum(a))}},CellList:{getProduct:function(){for(var a=1,b=0,c=this.length;c>b;b++){var d=this[b].getAnum();a*=d>0?d:0}return a}},Board:{qcols:9,qrows:9,hasborder:1},AreaRoomManager:{enabled:!0,hastop:!0},Graphic:{initialize:function(){this.Common.prototype.initialize.call(this),this.gridcolor=this.gridcolor_DLIGHT},paint:function(){this.drawBGCells(),this.drawGrid(),this.drawNumbers_factors(),this.drawBorders(),this.drawChassis(),this.drawCursor()},drawNumbers_factors:function(){for(var a=(this.vinc("cell_number","auto"),this.range.cells),b=0;b<a.length;b++){var c=a[b],d=["cell",c.id,"qans"].join("_"),e=["cell",c.id,"ques"].join("_"),f=c.bx*this.bw,g=c.by*this.bh;if(-1!==c.anum){var h=1==c.error?this.fontErrcolor:this.fontAnscolor,i=c.anum<10?.8:.7;this.dispnum(d,1,""+c.anum,i,h,f,g)}else this.hidenum(d);if(-1!==c.qnum){var i=.45;c.qnum>=1e5?i=.3:c.qnum>=1e4&&(i=.36),this.dispnum(e,5,""+c.qnum,i,this.fontcolor,f,g)}else this.hidenum(e)}}},Encode:{decodePzpr:function(){this.decodeBorder(),this.decodeRoomNumber16()},encodePzpr:function(){this.encodeBorder(),this.encodeRoomNumber16()}},FileIO:{decodeData:function(){this.decodeBorderQues(),this.decodeCellQnum(),this.decodeCellAnumsub()},encodeData:function(){this.encodeBorderQues(),this.encodeCellQnum(),this.encodeCellAnumsub()}},AnsCheck:{checkAns:function(){if(!this.checkRowsColsSameAnsNumber())return"nmDupRow";var a=this.owner.board.getRoomInfo();return this.checkRoomNumber(a)?this.checkNoAnumCell()?null:"ceEmpty":"nmProduct"},check1st:function(){return this.checkNoAnumCell()?null:"ceEmpty"},checkRowsColsSameAnsNumber:function(){return this.checkRowsCols(this.isDifferentNumberInClist,function(a){return a.getAnum()})},checkNoAnumCell:function(){return this.checkAllCell(function(a){return-1===a.getAnum()})},checkRoomNumber:function(a){for(var b=!0,c=1;c<=a.max;c++){var d=a.room[c],e=d.clist,f=e.getProduct();if(0!==f&&f!==d.top.getQnum()){if(this.checkOnly)return!1;e.seterr(1),b=!1}}return b}},FailCode:{nmProduct:["ブロックの数字と数字の積が同じではありません。","A number of room is not equal to the product of these numbers."],ceEmpty:["数字の入っていないマスがあります。","There is an empty cell."]}});
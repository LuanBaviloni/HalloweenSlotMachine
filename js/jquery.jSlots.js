/*
 * jQuery jSlots Plugin
 * http://matthewlein.com/jslot/
 * Copyright (c) 2011 Matthew Lein
 * Version: 1.0.2 (7/26/2012)
 * Dual licensed under the MIT and GPL licenses
 * Requires: jQuery v1.4.1 or later
 */
 
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

(function($){

    $.jSlots = function(el, options){

        var base = this;
		
        base.$el = $(el);
        base.el = el;

        base.$el.data("jSlots", base);

        base.init = function() {

            base.options = $.extend({},$.jSlots.defaultOptions, options);

            base.setup();
            base.bindEvents();

        };


        // --------------------------------------------------------------------- //
        // DEFAULT OPTIONS
        // --------------------------------------------------------------------- //

        $.jSlots.defaultOptions = {
            number : 3,          // Number: number of slots
            winnerNumber : 1,    // Number or Array: list item number(s) upon which to trigger a win, 1-based index, NOT ZERO-BASED
            spinner : '',        // CSS Selector: element to bind the start event to
            spinEvent : 'click', // String: event to start slots on this event
            onStart : $.noop,    // Function: runs on spin start,
            onEnd : $.noop,      // Function: run on spin end. It is passed (finalNumbers:Array). finalNumbers gives the index of the li each slot stopped on in order.
            onWin : $.noop,      // Function: run on winning number. It is passed (winCount:Number, winners:Array)
            easing : 'swing',    // String: easing type for final spin
            time : 7000,         // Number: total time of spin animation
            loops : 6            // Number: times it will spin during the animation
        };

        // --------------------------------------------------------------------- //
        // HELPERS
        // --------------------------------------------------------------------- //

        base.randomRange = function(low, high) {
            return Math.floor( Math.random() * (1 + high - low) ) + low;
        };
		
		base.randomObj = function(_array) {
			return _array[base.randomRange(0,(_array.length-1))];
		}
		
		base.pushObj = function(_array, _obj, _n) {
			for(i = 0; i < _n; i++) {
				_array.push(_obj);
			}
		}

        // --------------------------------------------------------------------- //
        // VARS
        // --------------------------------------------------------------------- //

        base.isSpinning	= false;
        base.spinSpeed	= 0;
        base.winCount	= 0;
        base.doneCount	= 0;

        base.$liHeight	= 0;
        base.$liWidth	= 0;

        base.winners	= [];
        base.allSlots	= [];
		
		base._objs		= [];
		base.betLines	= 20;
		base.betBase	= 10;
		
		//Valores em centavos
		base.betValue	= 1;
		base.betCredits	= 3000;
		base.betAward	= 0;
		base.showLines	= false;
		base.ILines		= [];
		
		base.awardValue	= '';
		base.matchLines;
		base.playAuto	= false;
		
		base.curBonus	= '';
		
		base.arrLines	=
		[{strokeStyle: '#ff2a2a',	strokeWidth: 1,
						x1:  -1,	y1:  100,
						x2:  200,	y2:  100
		},{strokeStyle: '#d42aff',	strokeWidth: 1,
						x1:  -1,	y1:  40,
						x2:  200,	y2:  40,
		},{strokeStyle: '#00ccff',	strokeWidth: 1,
						x1:  -1,	y1:  160,
						x2:  200,	y2:  160,
		},{strokeStyle: '#daa520',	strokeWidth: 1,
						x1:  -2,	y1:  -3,
						x2:  100,	y2:  175,
						x3:  200,	y3:  000,
		},{strokeStyle: '#008033',	strokeWidth: 1,
						x1:  -2,	y1:  203,
						x2:  100,	y2:  25,
						x3:  200,	y3:  200,
		},{strokeStyle: '#ff6600',	strokeWidth: 1,
						x1:  -2,	y1:  25,
						x2:  60,	y2:  25,
						x3:  140,	y3:  175,
						x4:  200,	y4:	 175
		},{strokeStyle: '#9955ff',	strokeWidth: 1,
						x1:  -2,	y1:  175,
						x2:  60,	y2:  175,
						x3:  140,	y3:  25,
						x4:  200,	y4:	 25
		},{strokeStyle: '#0088aa',	strokeWidth: 1,
						x1:  -2,	y1:  60,
						x2:  60,	y2:  180,
						x3:  140,	y3:  180,
						x4:  200,	y4:	 60
		},{strokeStyle: '#66ff00',	strokeWidth: 1,
						x1:  -2,	y1:  140,
						x2:  60,	y2:  20,
						x3:  140,	y3:  20,
						x4:  200,	y4:	 140
		},{strokeStyle: '#afe9dd',	strokeWidth: 1,
						x1:  -2,	y1:  127.5,
						x2:  57.5,	y2:  12.5,
						x3:  140,	y3:  167.5,
						x4:  200,	y4:	 47.5
		},{strokeStyle: '#ddff55',	strokeWidth: 1,
						x1:   0,	y1:  75,
						x2:  57.5,	y2:  187.5,
						x3:  140,	y3:  32.5,
						x4:  202,	y4:	 157.5
		},{strokeStyle: '#ffffff',	strokeWidth: 1,
						x1:   0,	y1:  185,
						x2:  100,	y2:  10,
						x3:  202,	y3:  10,
		},{strokeStyle: '#d35f5f',	strokeWidth: 1,
						x1:  -0,	y1:  15,
						x2:  100,	y2:  190,
						x3:  202,	y3:  190,
		},{strokeStyle: '#2a7fff',	strokeWidth: 1,
						x1:   0,	y1:  10,
						x2:  100,	y2:  10,
						x3:  200,	y3:  182.5,
						x4:  202,	y4:  182.5,
		},{strokeStyle: '#d45500',	strokeWidth: 1,
						x1:   0,	y1:  190,
						x2:  100,	y2:  190,
						x3:  200,	y3:  17.5,
						x4:  202,	y4:  17.5,
		},{strokeStyle: '#0088aa',	strokeWidth: 1,
						x1:   0,	y1:  15,
						x2:  140,	y2:  15,
						x3:  202,	y3:  135,
		},{strokeStyle: '#d4aa00',	strokeWidth: 1,
						x1:   0,	y1:  185,
						x2:  140,	y2:  185,
						x3:  202,	y3:  65,
		},{strokeStyle: '#d40000',	strokeWidth: 1,
						x1:   0,	y1:  145,
						x2:   72.5,	y2:   5,
						x3:  200,	y3:   5,
						x4:  202,	y4:   0,
		},{strokeStyle: '#8800aa',	strokeWidth: 1,
						x1:   0,	y1:  55,
						x2:   72.5,	y2:   195,
						x3:  200,	y3:   195,
						x4:  202,	y4:   200,
		},{strokeStyle: '#0066ff',	strokeWidth: 1,
						x1:   0,	y1:   190,
						x2:   70,	y2:   70,
						x3:  150,	y3:   70,
						x4:  202,	y4:   30,
		}];
		

        // --------------------------------------------------------------------- //
        // FUNCTIONS
        // --------------------------------------------------------------------- //


        base.setup = function() {

            // set sizes
			base.pushObj(base._objs, 'objCat',			8);
			base.pushObj(base._objs, 'objFrank',	 	4);
			base.pushObj(base._objs, 'objGhost',		4);
			base.pushObj(base._objs, 'objSkull',		3);
			base.pushObj(base._objs, 'objVampire',		3);
			base.pushObj(base._objs, 'objHat',			3);
			base.pushObj(base._objs, 'objWitch',		3);
			base.pushObj(base._objs, 'objMoon',			2);
			base.pushObj(base._objs, 'objCandy',		2);
			base.pushObj(base._objs, 'objCauldron',		2);			
			base.pushObj(base._objs, 'objSatan',		1);			
			base.pushObj(base._objs, 'objPumpkin',		1);
			
			/* BEGIN */
            var $ul		= base.$el;
            var $li		= $ul.find('li').first();
			var $dvCol	= $ul.parent();
			
			base.$liHeight	= $li.outerHeight();
            base.$liWidth	= $li.outerWidth();
            base.liCount	= $ul.children().length;
            base.listHeight	= base.$liHeight * base.liCount;
            base.increment	= (base.options.time / base.options.loops) / base.options.loops;

            $ul.css('position', 'relative');

            $li.clone().appendTo($ul);
			$li.clone().appendTo($ul);
			$li.clone().appendTo($ul);
					
            base.$wrapper = $dvCol.wrap('<div class="jSlots-wrapper"></div>').parent();

            // remove original, so it can be recreated as a Slot
            $dvCol.remove();

            // clone lists
            for (var i = base.options.number - 1; i >= 0; i--){
                base.allSlots.push( new base.Slot(i) );
            }

        };
		
		base.drawCanvas = function(){
			addCanvas = 120;
			$('canvas').remove();
			
			$center = $('.dvCenter');
			$canvas = $('<canvas width="'+($center.width()+addCanvas)+'" height="'+($center.height()+addCanvas)+'" class="dvCanvas" id="dvCanvas"></div>').appendTo($center);
			
			//$canvas.clearCanvas();
			$canvas.
			translateCanvas({
				translateX: (addCanvas/2), translateY: (addCanvas/2)}).
			scaleCanvas({
				scaleX: ($center.width()/200), scaleY: ($center.height()/200)
			});
			
			base.betValue = base.betBase*base.betLines;
			
			$('#betBase').html('x'+base.betBase);
			$('#betValue').html(float2moeda((base.betValue/100), 'R$ '));
			$('#betCredits').html(float2moeda((base.betCredits/100), 'R$ '));
			if (base.betAward == 0 ) {
				$('#betAward').html('&nbsp;');
			} else {
				$('#betAward').html(float2moeda((base.betAward/100), 'R$ '));
			}
			
			if (!base.playAuto) {
				$('#playAuto').html('&nbsp;');
			} else {
				$('#playAuto').html('JOGO AUTOM&Aacute;TICO');
			}
			
			if (base.showLines) {
				if (base.betLines >= 1) {
					$canvas.drawLine(base.arrLines[0]);
				}
				
				if (base.betLines >= 5) {

					$canvas.drawLine(base.arrLines[1]);
					$canvas.drawLine(base.arrLines[2]); 
					$canvas.drawLine(base.arrLines[3]);
					$canvas.drawLine(base.arrLines[4]);
				}
				
				if (base.betLines >= 9) {
					$canvas.drawLine(base.arrLines[5]); 
					$canvas.drawLine(base.arrLines[6]);
					$canvas.drawLine(base.arrLines[7]); 
					$canvas.drawLine(base.arrLines[8]);
				} 
				
				
				if (base.betLines >= 15) {
					$canvas.drawLine(base.arrLines[9]);
					$canvas.drawLine(base.arrLines[10]);
					$canvas.drawLine(base.arrLines[11]);
					$canvas.drawLine(base.arrLines[12]); 
					$canvas.drawLine(base.arrLines[13]); 
					$canvas.drawLine(base.arrLines[14]);
				}/**/
				
				if (base.betLines >= 20) {
					$canvas.drawLine(base.arrLines[15]);
					$canvas.drawLine(base.arrLines[16]);
					$canvas.drawLine(base.arrLines[17]);
					$canvas.drawLine(base.arrLines[18]);
					$canvas.drawLine(base.arrLines[19]); /**/
				}
			}
			
			if (base.ILines.length > 0) {
				//console.log('---> '+base.ILines);
				for(zz=0; zz<base.ILines.length; zz++) {
					$canvas.drawLine(base.arrLines[base.ILines[zz]]);
					//console.log('Desenhando linha: '+zz);
				}
			}
			
			
			if (base.betLines >= 1) {
				$canvas.drawImage({source: 'imgs/b1.png',	x: -3, y: 100,	width: 4, height: 9});
			}
			
			if (base.betLines >= 5) {
				$canvas.drawImage({source: 'imgs/b2.png',	x: -3, y:  40,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b3.png',	x: -3, y: 160,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b4.png',	x: -3, y:  -2,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b5.png',	x: -3, y: 202,	width: 4, height: 9});
			}
			
			if (base.betLines >= 9) {
				$canvas.drawImage({source: 'imgs/b6.png',	x: -3, y:  25,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b7.png',	x: -3, y: 175,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b8.png',	x: -3, y:  60,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b9.png',	x: -3, y: 140,	width: 4, height: 9});
			}
			
			if (base.betLines >= 15) {
				$canvas.drawImage({source: 'imgs/b10.png',	x: -3, y: 130,	width: 4, height: 9});
			
				$canvas.drawImage({source: 'imgs/b11.png',	x: 203, y: 155,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b12.png',	x: 203, y:  10,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b13.png',	x: 203, y: 190,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b14.png',	x: 203, y: 180,	width: 4, height: 9});	
				$canvas.drawImage({source: 'imgs/b15.png',	x: 203, y:  20,	width: 4, height: 9});
			}
			
			if (base.betLines >= 20) {
				$canvas.drawImage({source: 'imgs/b16.png',	x: 203, y: 135,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b17.png',	x: 203, y:  65,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b18.png',	x: 203, y:   0,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b19.png',	x: 203, y: 200,	width: 4, height: 9});
				$canvas.drawImage({source: 'imgs/b20.png',	x: 203, y:  30,	width: 4, height: 9});
			}
		};

        base.bindEvents = function() {
            $(base.options.spinner).bind(base.options.spinEvent, function(event) {
                if (!base.isSpinning) {
                    base.playSlots();
                }
            });
        };
		
		$(window).on('resize', function(){
			  base.drawCanvas();
		});
		
		$(document).on('keypress', function(e){
			e = e || window.event;
			var cc = e.keyCode ? (e.keyCode) : e.which;
			var ch = String.fromCharCode(cc);
			
			switch(ch) {
				case 'q':
					base.betLines	= 1;
					break;
				case 'w':
					base.betLines	= 5;
					break;
				case 'e':
					base.betLines	= 9;
					break;
				case 'r':
					base.betLines	= 15;
					break;
				case 't':
					base.betLines	= 20;
					break;
					
				case 'f':
					base.betBase	= base.betBase-1;
					if (base.betBase <= 0) {
						base.betBase = 10;
					}
					break;
				case 'g':
					base.betBase	= (base.betBase%10)+1;
					break;
					
				case 'p':
					base.betCredits	+= 200;
					break;
				case 's':
					base.playAuto	= !base.playAuto;
					break;
				case 'h':
					$el = $('.dvHelp');
					
					if ($el.is(':visible')) {
						$el.fadeOut();
					} else {
						$el.fadeIn();
					}
					break;
			}
			if (cc == 13) {
				if (!base.isSpinning) {
					base.playSlots();
				}
			}
			
			if ($.inArray(ch, ['q','w','e','r','t','g','f','p','s']) > -1) {
				base.showLines	= true;
				base.drawCanvas();
			}
			
			if ($.inArray(ch, ['1','2','3','4','5']) > -1) {
				base.doBonus(ch);
			}
		});

        // Slot contstructor
        base.Slot = function(n) {
            this.spinSpeed = 0;
            this.el = base.$el.clone().wrap('<div class="dvCol"></div>').parent().appendTo(base.$wrapper).children()[0];
            this.$el = $(this.el);
            this.loopCount = 0;
            this.number = [];
			this.slotn = (base.options.number-n);
			this.vStop  = (base.options.number-n)*0.3;
			
			this.$el.parent()
				.css( 'height', '0' )
				.animate( { 'height' : '100%' }, 1000, 'easeInQuart', function() {					
					$(this).find('.ulSlot').css('opacity', '0').animate( { 'opacity' : '1' }, 2000, 'easeInQuart');
				});
				
			base.drawCanvas();
        };


        base.Slot.prototype = {

            // do one rotation
            spinEm : function() {

                var that = this;
				
				if (that.loopCount == 0) {
					for (i=4; i<=6; i++) {
						that.$el.find('li:nth-child('+(i)+')').removeClass().addClass(that.$el.find('li:nth-child('+(i-3)+')').attr('class'));
						//alert(i);
					}
				} /**/

				for (i=1; i<=3; i++) {
					that.$el.find('li:nth-child('+(i+3)+')').removeClass().addClass(that.$el.find('li:nth-child('+i+')').attr('class'));
				}/**/
				
				if (that.loopCount != 0) {
					$(that.$el.find('li:nth-child(-n+3)').get().reverse()).each(function (){
						$(this).removeClass().addClass(base.randomObj(base._objs));
						
					});
				}

                that.$el
                    .css( 'top', -base.listHeight )
                    .animate( { 'top' : '0px' }, that.spinSpeed, 'linear', function() {
                        that.lowerSpeed();
                    });

            },

            lowerSpeed : function() {

                this.spinSpeed += base.increment;
                this.loopCount++;

                if ( this.loopCount < (base.options.loops+this.slotn) ) {
                    this.spinEm();

                } else {
                    this.finish();
                }
            },

            // final rotation
            finish : function() {

                var that = this;
				
				for (i=1; i<=3; i++) {
					that.$el.find('li:nth-child('+(i+3)+')').removeClass().addClass(that.$el.find('li:nth-child('+i+')').attr('class'));
				}/**/
				
				i = 2;
				$(that.$el.find('li:nth-child(-n+3)').get().reverse()).each(function (){
					//$(this).removeClass().addClass(base.randomObj(base._objs));
					$(this).removeClass().addClass(that.number[i]);
					i--;
				});/**/
				
                var endNum = 1;
				//var endNum = base.randomRange( 1, base.liCount );

                var finalPos = - ( (base.$liHeight * endNum) - base.$liHeight );
                //var finalSpeed = ( (this.spinSpeed * this.vStop) * (base.liCount) ) / endNum;
				var finalSpeed = that.spinSpeed;

                that.$el
                    .css( 'top', -base.listHeight )
                    .animate( {'top': finalPos}, finalSpeed, base.options.easing, function() {
						//that.$el.find(':nth-child('+endNum+')').html()
                        base.checkWinner(parseInt(that.$el.find(':nth-child('+endNum+')').html()), that);
                    });
					
            }

        };
		
		base.doBonus =  function(ch) {
			if (base.curBonus == '') return false;
			
			$.ajax({
				url: 'sort.php?a=bonus&k=' + ch,
				async : false,
				success: function(data) {

					if (base.curBonus == 'bonusCauldron') {
						Cauldrons = data.split('|');
						$('#CauldronLine').find('div').each(function() {						
							$(this).html(Cauldrons.shift());
						});
						_interval = setInterval(function(){		
							$('#bonusCauldron').hide();
							soundEl['cauldron'].pause();
							base.curBonus = '';
							clearInterval(_interval);
						}, 3000);
					}
				}
			});
		}
		
		base.activateBonus = function(playBonusSound) {
			if (base.curBonus == '') return false;
			
			// Remove o Jogo Automatico
			base.playAuto = !base.playAuto;		
			if ((playBonusSound) && (soundEl['bonus'].paused)) {
				soundEl['bonus'].play();
			}
			
			if (base.curBonus == 'bonusCauldron') {
				$('#CauldronLine').find('div').each(function() {						
							$(this).html('');
				});
				$('#bonusCauldron').show();				
				soundEl['cauldron'].play();
			}
		};

        base.checkWinner = function(endNum, slot) {

            base.doneCount++;
            // set the slot number to whatever it ended on
            slot.number = endNum;

            // if its in the winners array
            if (
                ( $.isArray( base.options.winnerNumber ) && base.options.winnerNumber.indexOf(endNum) > -1 ) ||
					endNum === base.options.winnerNumber/**/
                ) {

                // its a winner!
                base.winCount++;
                base.winners.push(slot.$el);

            }

            if (base.doneCount === base.options.number) {

                /*var finalNumbers = [];

                $.each(base.allSlots, function(index, val) {
                    finalNumbers[index] = val.number;
                });

                if ( $.isFunction( base.options.onEnd ) ) {
                    base.options.onEnd(finalNumbers);
                }/**/
				
				if (base.matchLines != '') {
					soundEl['wheel'].pause();
					soundEl['wheel'].currentTime = 0;
				
					matchs = base.matchLines.split(',');				

					_av = base.awardValue.split(',');
					v	= 0;
					_interval = setInterval(function(){						
						if (v >= _av.length) {
							base.betCredits		+= base.betAward;
							base.betAward 	 	= 0;
							base.drawCanvas();
							clearInterval(_interval);
							base.isSpinning = false;
							soundEl['pay'].play();
							
							if (base.playAuto) {
								base.playSlots();
							}
							if (base.curBonus != '') {
								base.activateBonus();
							}
						} else {
							base.winCount++;
							match	= matchs[v].split('=');
							linha	= parseInt(match[0]);
							points	= match[1].split('.');
							
							//console.log('Premio...');
							base.ILines.push(linha);
							for(i=0; i < points.length; i++) {
								//alert(quads[0]+';'+quads[1]+'='+linha);
								point = points[i].split(';');
								//console.log(point);
								base.allSlots[point[0]].$el.find('li:nth-child('+(parseInt(point[1])+1)+')').addClass('winner');
							}
								base.betAward += parseInt(_av[v]);

							if (_av[v].indexOf('c') > 0) {
								base.curBonus = 'bonusCauldron';
								soundEl['bonus'].play();
							} else {
								soundEl['match'].pause();
								soundEl['match'].currentTime = 0;
								soundEl['match'].play();
							}
							base.drawCanvas();
						}
						v++;
					}, 800);
					
				} else {
					base.isSpinning = false;
					soundEl['wheel'].pause();
					soundEl['wheel'].currentTime = 0;
					if (base.playAuto) {
						_interval = setInterval(function(){
							clearInterval(_interval);
							base.playSlots();
						}, 1000);
					}
					
				}

                /*if ( base.winCount && $.isFunction(base.options.onWin) ) {
                    base.options.onWin(base.winCount, base.winners, finalNumbers);
                } /**/
				
				
						
						
            }
        };


        base.playSlots = function() {
		
			if ((base.betCredits - base.betValue) < 0) {
				//base.betCredits += 1000;
				return false;
			}
			
			if (base.curBonus != '') {
				return false;
			}			
			
			$.ajax({
					url: 'sort.php?a=lucky&l=' + base.betLines + '&b=' + base.betBase,
					async : false,
					success: function(data) {
						if (data.indexOf('|') == -1) {
							stop = true;
							if (data.indexOf('bonus') > -1) {
								base.curBonus = data;
								base.activateBonus();
							}
						} else {
							base.curBonus = '';
							stop = false;
							cols = data.split('|')
							for (i=0;i<5;i++) {
								base.allSlots[i].number = cols[i].split(',');
							}
							base.matchLines = cols[5];
							base.awardValue	= cols[6];
						}
					}
			});
			
			if (stop) return false;
			
            base.isSpinning = true;
            base.winCount = 0;
            base.doneCount = 0;
            base.winners = [];
			base.ILines	 = [];
			base.betCredits = base.betCredits - base.betValue;
			$('#betCredits').html(float2moeda((base.betCredits/100), 'R$ '));
			
			
			if (base.drawCanvas) {
				base.showLines	= false;
				base.drawCanvas();
			}

            if ( $.isFunction(base.options.onStart) ) {
                base.options.onStart();
            }

			soundEl['wheel'].play();
            $.each(base.allSlots, function(index, val) {
                this.spinSpeed = 0;
                this.loopCount = 0;
                this.spinEm();
            });

        };


        base.onWin = function() {
            if ( $.isFunction(base.options.onWin) ) {
                base.options.onWin();
				
            }
        };


        // Run initializer
        base.init();
    };


    // --------------------------------------------------------------------- //
    // JQUERY FN
    // --------------------------------------------------------------------- //

    $.fn.jSlots = function(options){
        if (this.length) {
            return this.each(function(){
                (new $.jSlots(this, options));
            });
        }
    };
	

})(jQuery);


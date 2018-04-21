/**/

function pick(arg, def) {
   return (typeof arg == 'undefined' ? def : arg);
}

function float2moeda(num,start) {
	x = 0;
	
	start = pick(start, '');
	
   if( num < 0 ) {
      num = Math.abs(num);
      x = 1;
   }
   if(isNaN(num)) num = "0";
      cents = Math.floor((num*100+0.5)%100);

   num = Math.floor((num*100+0.5)/100).toString();

   if(cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
         num = num.substring(0,num.length-(4*i+3))+'.'
               +num.substring(num.length-(4*i+3));
   
   ret = start + num + ',' + cents;
   
   if (x == 1) ret = ' - ' + ret;return ret;

}

$(window).load(function() {
    $('.dvLoading').hide();
	
	// Load sounds
	var folder	= 'sounds/';
	var sounds	= {	'play'		: 'play.mp3',
					'theme'		: 'theme.mp3',
					'witch'		: 'witch_laugh.mp3',
					'match'		: 'match.wav',
					'pay'		: 'pay.wav',
					'wheel'		: 'wheel.wav',
					'bonus'		: 'bonus1.wav',
					'cauldron'	: 'cauldron.mp3'};
	soundEl	= { };
	
	for (var key in sounds){
		soundEl[key] = document.createElement('audio');
		soundEl[key].setAttribute('src', folder + sounds[key]);
		soundEl[key].volume = 0.1;
	}
	
	soundEl['wheel'].loop		= true;
	soundEl['cauldron'].loop	= true;
	
	
	// draw canvas
	/*addCanvas = 120;
	$center = $('.dvCenter');	
	$canvas = $('<canvas width="'+($center.width()+addCanvas)+'" height="'+($center.height()+addCanvas)+'" class="dvCanvas" id="dvCanvas"></div>').appendTo($center);
	
	$canvas.
	translateCanvas({
		translateX: (addCanvas/2), translateY: (addCanvas/2)}).
	scaleCanvas({
		scaleX: ($center.width()/200), scaleY: ($center.height()/200)
	}); /**/
	
	
	//Linha 01
	/*$canvas.drawLine({strokeStyle: '#ff2a2a',	strokeWidth: 1,
		x1:  -1,	y1:  100,
		x2:  200,	y2:  100
	});
	
	//Linha 02
	$canvas.drawLine({strokeStyle: '#d42aff',	strokeWidth: 1,
		x1:  -1,	y1:  40,
		x2:  200,	y2:  40,
	});
	
	
	//Linha 03
	$canvas.drawLine({strokeStyle: '#00ccff',	strokeWidth: 1,
		x1:  -1,	y1:  160,
		x2:  200,	y2:  160,
	}); 
	
	
	//Linha 04
	$canvas.drawLine({strokeStyle: '#daa520',	strokeWidth: 1,
		x1:  -2,	y1:  -3,
		x2:  100,	y2:  175,
		x3:  200,	y3:  000,
	});
	
	//Linha 05
	$canvas.drawLine({strokeStyle: '#008033',	strokeWidth: 1,
		x1:  -2,	y1:  203,
		x2:  100,	y2:  25,
		x3:  200,	y3:  200,
	});
	

	//Linha 06
	$canvas.drawLine({strokeStyle: '#ff6600',	strokeWidth: 1,
		x1:  -2,	y1:  25,
		x2:  60,	y2:  25,
		x3:  140,	y3:  175,
		x4:  200,	y4:	 175
	}); 
	
	//Linha 07
	$canvas.drawLine({strokeStyle: '#9955ff',	strokeWidth: 1,
		x1:  -2,	y1:  175,
		x2:  60,	y2:  175,
		x3:  140,	y3:  25,
		x4:  200,	y4:	 25
	});
	
	
	//Linha 08
	$canvas.drawLine({strokeStyle: '#0088aa',	strokeWidth: 1,
		x1:  -2,	y1:  60,
		x2:  60,	y2:  180,
		x3:  140,	y3:  180,
		x4:  200,	y4:	 60
	}); 
	
	//Linha 09
	$canvas.drawLine({strokeStyle: '#66ff00',	strokeWidth: 1,
		x1:  -2,	y1:  140,
		x2:  60,	y2:  20,
		x3:  140,	y3:  20,
		x4:  200,	y4:	 140
	}); 
	
	//Linha 10
	$canvas.drawLine({strokeStyle: '#afe9dd',	strokeWidth: 1,
		x1:  -2,	y1:  127.5,
		x2:  57.5,	y2:  12.5,
		x3:  140,	y3:  167.5,
		x4:  200,	y4:	 47.5
	});
	
	
	//Linha 11
	$canvas.drawLine({strokeStyle: '#ddff55',	strokeWidth: 1,
		x1:   0,	y1:  75,
		x2:  57.5,	y2:  187.5,
		x3:  140,	y3:  32.5,
		x4:  202,	y4:	 157.5
	}); 
	
	//Linha 12
	$canvas.drawLine({strokeStyle: '#ffffff',	strokeWidth: 1,
		x1:   0,	y1:  185,
		x2:  100,	y2:  10,
		x3:  202,	y3:  10,
	}); 
	
	
	//Linha 13
	$canvas.drawLine({strokeStyle: '#d35f5f',	strokeWidth: 1,
		x1:  -0,	y1:  15,
		x2:  100,	y2:  190,
		x3:  202,	y3:  190,
	}); 
	
	//Linha 14
	$canvas.drawLine({strokeStyle: '#2a7fff',	strokeWidth: 1,
		x1:   0,	y1:  10,
		x2:  100,	y2:  10,
		x3:  200,	y3:  182.5,
		x4:  202,	y4:  182.5,
	}); 
	
	//Linha 15
	$canvas.drawLine({strokeStyle: '#d45500',	strokeWidth: 1,
		x1:   0,	y1:  190,
		x2:  100,	y2:  190,
		x3:  200,	y3:  17.5,
		x4:  202,	y4:  17.5,
	}); 
	
	//Linha 16
	$canvas.drawLine({strokeStyle: '#0088aa',	strokeWidth: 1,
		x1:   0,	y1:  15,
		x2:  140,	y2:  15,
		x3:  202,	y3:  135,
	});
	
	//Linha 17
	$canvas.drawLine({strokeStyle: '#d4aa00',	strokeWidth: 1,
		x1:   0,	y1:  185,
		x2:  140,	y2:  185,
		x3:  202,	y3:  65,
	});
	
	//Linha 18
	$canvas.drawLine({strokeStyle: '#d40000',	strokeWidth: 1,
		x1:   0,	y1:  145,
		x2:   72.5,	y2:   5,
		x3:  200,	y3:   5,
		x4:  202,	y4:   0,
	});
	
	//Linha 19
	$canvas.drawLine({strokeStyle: '#8800aa',	strokeWidth: 1,
		x1:   0,	y1:  55,
		x2:   72.5,	y2:   195,
		x3:  200,	y3:   195,
		x4:  202,	y4:   200,
	});
	
	//Linha 20
	$canvas.drawLine({strokeStyle: '#0066ff',	strokeWidth: 1,
		x1:   0,	y1:   190,
		x2:   70,	y2:   70,
		x3:  150,	y3:   70,
		x4:  202,	y4:   30,
	}); /**/
	
	
	/*$canvas.drawImage({source: 'imgs/b1.png',	x: -3, y: 100,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b2.png',	x: -3, y:  40,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b3.png',	x: -3, y: 160,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b4.png',	x: -3, y:  -2,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b5.png',	x: -3, y: 202,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b6.png',	x: -3, y:  25,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b7.png',	x: -3, y: 175,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b8.png',	x: -3, y:  60,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b9.png',	x: -3, y: 140,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b10.png',	x: -3, y: 130,	width: 4, height: 9});
	
	
	$canvas.drawImage({source: 'imgs/b11.png',	x: 203, y: 155,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b12.png',	x: 203, y:  10,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b13.png',	x: 203, y: 190,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b14.png',	x: 203, y: 180,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b15.png',	x: 203, y:  20,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b16.png',	x: 203, y: 135,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b17.png',	x: 203, y:  65,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b18.png',	x: 203, y:   0,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b19.png',	x: 203, y: 200,	width: 4, height: 9});
	$canvas.drawImage({source: 'imgs/b20.png',	x: 203, y:  30,	width: 4, height: 9}); /**/
});


/*
$( window ).resize(function() {
		$canvas
			.attr('width'	, $center.width()+addCanvas)
			.attr('height'	, $center.height()+addCanvas);
		
}); /**/
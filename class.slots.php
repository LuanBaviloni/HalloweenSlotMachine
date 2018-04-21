<?php

	/*
	 *  ICG System
	 *
	 *  - Busca CLASS
	 *
	 */
	 
	class TPoint {
		public $x = 0;
		public $y = 0;
		
		function __construct($_x, $_y) {
			$this->x = $_x;
			$this->y = $_y;
		}
	}

	class CLASS_SLOTS {
	
		private $_objItems = array ();
		
		private $_objValueItems = array (
			'objCat'		=>	1,
			'objFrank'		=>	2,
			'objGhost'		=>	3,
			'objSkull'		=>	5,
			'objVampire'	=>	10,
			'objHat'		=>	14,
			'objWitch'		=>	26,
			'objMoon'		=>	30,
			'objCandy'		=>	40,
			'objCauldron'	=>	40,
			'objSatan'		=>	60,
			'objPumpkin'	=>	90/**/
		);
		
		private $Lines = array();
		
		
		
		private $_AwardValues = array(); 
		
		function __construct() {
			if (!isset($_SESSION['Bonus'])) {
				$_SESSION['Bonus'] = array();
			}
		
			$this->itemPush($this->_objItems,'objCat',		24);
			$this->itemPush($this->_objItems,'objFrank',	20);
			$this->itemPush($this->_objItems,'objGhost',	16);
			$this->itemPush($this->_objItems,'objSkull',	12);
			$this->itemPush($this->_objItems,'objVampire',	10);
			$this->itemPush($this->_objItems,'objCauldron',	9);
			$this->itemPush($this->_objItems,'objHat',		8);
			$this->itemPush($this->_objItems,'objWitch',	7);
			$this->itemPush($this->_objItems,'objMoon',		6);/**/
			$this->itemPush($this->_objItems,'objCandy',	5);
			$this->itemPush($this->_objItems,'objSatan',	4);
			$this->itemPush($this->_objItems,'objPumpkin',	4); /**/
			
			
			
			array_push($this->Lines,array(new TPoint(0, 1), new TPoint(1, 1), new TPoint(2, 1), new TPoint(3, 1), new TPoint(4, 1))); //Linha 1
			
			array_push($this->Lines,array(new TPoint(0, 0), new TPoint(1, 0), new TPoint(2, 0), new TPoint(3, 0), new TPoint(4, 0))); //Linha 2
			array_push($this->Lines,array(new TPoint(0, 2), new TPoint(1, 2), new TPoint(2, 2), new TPoint(3, 2), new TPoint(4, 2))); //Linha 3
			array_push($this->Lines,array(new TPoint(0, 0), new TPoint(1, 1), new TPoint(2, 2), new TPoint(3, 1), new TPoint(4, 0))); //Linha 4
			array_push($this->Lines,array(new TPoint(0, 2), new TPoint(1, 1), new TPoint(2, 0), new TPoint(3, 1), new TPoint(4, 2))); //Linha 5
			
			array_push($this->Lines,array(new TPoint(0, 0), new TPoint(1, 0), new TPoint(2, 1), new TPoint(3, 2), new TPoint(4, 2))); //Linha 6
			array_push($this->Lines,array(new TPoint(0, 2), new TPoint(1, 2), new TPoint(2, 1), new TPoint(3, 0), new TPoint(4, 0))); //Linha 7
			array_push($this->Lines,array(new TPoint(0, 1), new TPoint(1, 2), new TPoint(2, 2), new TPoint(3, 2), new TPoint(4, 1))); //Linha 8
			array_push($this->Lines,array(new TPoint(0, 1), new TPoint(1, 0), new TPoint(2, 0), new TPoint(3, 0), new TPoint(4, 1))); //Linha 9
			
			array_push($this->Lines,array(new TPoint(0, 1), new TPoint(1, 0), new TPoint(2, 1), new TPoint(3, 2), new TPoint(4, 1))); //Linha 10
			array_push($this->Lines,array(new TPoint(0, 1), new TPoint(1, 2), new TPoint(2, 1), new TPoint(3, 0), new TPoint(4, 1))); //Linha 11
			array_push($this->Lines,array(new TPoint(0, 2), new TPoint(1, 1), new TPoint(2, 0), new TPoint(3, 0), new TPoint(4, 0))); //Linha 12
			array_push($this->Lines,array(new TPoint(0, 0), new TPoint(1, 1), new TPoint(2, 2), new TPoint(3, 2), new TPoint(4, 2))); //Linha 13
			array_push($this->Lines,array(new TPoint(0, 0), new TPoint(1, 0), new TPoint(2, 0), new TPoint(3, 1), new TPoint(4, 2))); //Linha 14
			array_push($this->Lines,array(new TPoint(0, 2), new TPoint(1, 2), new TPoint(2, 2), new TPoint(3, 1), new TPoint(4, 0))); //Linha 15
			
			array_push($this->Lines,array(new TPoint(0, 0), new TPoint(1, 0), new TPoint(2, 0), new TPoint(3, 0), new TPoint(4, 1))); //Linha 16
			array_push($this->Lines,array(new TPoint(0, 2), new TPoint(1, 2), new TPoint(2, 2), new TPoint(3, 2), new TPoint(4, 1))); //Linha 17
			array_push($this->Lines,array(new TPoint(0, 1), new TPoint(1, 0), new TPoint(2, 0), new TPoint(3, 0), new TPoint(4, 0))); //Linha 18
			array_push($this->Lines,array(new TPoint(0, 1), new TPoint(1, 2), new TPoint(2, 2), new TPoint(3, 2), new TPoint(4, 2))); //Linha 19
			array_push($this->Lines,array(new TPoint(0, 2), new TPoint(1, 1), new TPoint(2, 1), new TPoint(3, 1), new TPoint(4, 0))); //Linha 20
			
		}
		
		public function itemPush(&$a, $item, $n) {
			for ($i=0;$i<$n;$i++) {
				array_push($a, $item);
			}
		}
		
		public function canPlay() {
			return ((count($_SESSION['Bonus'])) == 0);
		}
		
		public function isBonus($el) {
			$ret = '';
			switch($el) {
				case 'objCauldron': {
					$ret = 'c';
					break;
				}
				case 'objCandy': {
					$ret = 'y';
					break;
				}
			}
			
			if ($ret != '') {
				$what = str_replace('obj', 'bonus', $el);
				if (!in_array($what, $_SESSION['Bonus'])) {
					array_push($_SESSION['Bonus'], $what);
				}
			}
			
			return $ret;
		}
		
		public function CheckLine($LineNumber,$LineItems = array()) {
			$last	= '';
			$total	= 0;
			
			$ret		= '';
			$ret_add	= array();
			
			array_push($LineItems, '');
			foreach ($LineItems as $i => $v) {
				if ($v != $last) {
					if ($total >= 3) 
					{
						//$ret = $ret . ($i-$total).'.'.$total;
						for($z = $i-$total; $z < $i; $z++) {
							array_push($ret_add, $this->Lines[$LineNumber][$z]->x . ';' . $this->Lines[$LineNumber][$z]->y);
						}
						$ret		.= 	implode($ret_add,'.');
						
						$ret_add	= array();
						array_push($this->_AwardValues, $this->_objValueItems[$last]*($GLOBALS['base'])*$total . $this->isBonus($last));
					}
					$total = 1;
				} else {
					$total++;
				}
				$last = $v;
			}
			
			if ($ret == '') {
				if (($LineItems[0] == $LineItems[2]) && ($LineItems[2] == $LineItems[4])) {
					$total = 2;
					$last = $LineItems[0];
					for ($z = 0; $z <= 4; $z = $z+2) {
						array_push($ret_add, $this->Lines[$LineNumber][$z]->x . ';' . $this->Lines[$LineNumber][$z]->y);
					}
					$ret		.= 	implode($ret_add,'.');
					array_push($this->_AwardValues, $this->_objValueItems[$last]*($GLOBALS['base'])*$total . $this->isBonus($last));
				}
			}
			
			return $ret;
			
		}
		
		public function DoBonus() {
			$curBonus	= array_shift($_SESSION['Bonus']);
			//$curBonus 	= 'bonusCauldron';
			$k			= (int)$_GET['k'];
			
			switch($curBonus) {
				case 'bonusCauldron':
					$values = array('50','75','100','150','BONUS!');
					shuffle($values);
					foreach($values as $i => $v) {
						if ($i != ($k-1))
							$values[$i] = "<br/>".$v;
					}
					echo implode($values,'|');
					break;
				case 'bonusCandy':
					break;
			
			}
			
			exit;
		}
		
		
		public function GenSlots() {
			if (!$this->canPlay()) {
				echo $_SESSION['Bonus'][0];
				exit;
			}
		
			$GLOBALS['base'] = (isset($_REQUEST['b'])) ? (int)$_REQUEST['b'] : 1;		
			$GLOBALS['lins'] = (isset($_REQUEST['l'])) ? (int)$_REQUEST['l'] : 1;		
		
			$Cols = array();
			for ($i=1; $i<=5; $i++) {
				$SlotsItems = array();
				for ($j=1; $j<=3; $j++) {
					//randomize();
					//array_rand($this->_objItems, 1)
					array_push($SlotsItems, $this->_objItems[array_rand($this->_objItems, 1)]);
				}
				array_push($Cols, $SlotsItems);
			}
			//print_r($Cols);
			
			
			$LinesMatch = array();
			foreach($this->Lines as $i => $v) {
				$CurrentLine = array();
				for ($rr=0; $rr<5; $rr++) {
					array_push($CurrentLine, $Cols[$v[$rr]->x][$v[$rr]->y]);
				}
				
				$r = $this->CheckLine($i, $CurrentLine);
				if ($r != '') {
					array_push($LinesMatch, $i .'='. $r);
				}
				//echo $i."====> " . $this->CheckLine($CurrentLine) . "\n";
				//print_r($CurrentLine);
				
				if ($i == ($GLOBALS['lins']-1)) break;
			}
			
			$StrItems = array();
			foreach($Cols as $i => $v) {
				$StrItem = implode($v, ',');
				array_push($StrItems, $StrItem);
			}
			echo implode($StrItems, '|') . '|' . implode($LinesMatch, ',') . '|' . implode($this->_AwardValues, ',');
			//echo "objFrank,objCat,objSkull|objFrank,objFrank,objGhost|objFrank,objGhost,objCat|objGhost,objSkull,objFrank|objGhost,objCat,objMoon||";
			
			exit;
		}
	}
?>
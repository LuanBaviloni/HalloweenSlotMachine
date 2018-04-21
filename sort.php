<?php
	session_start();

	include_once("class.slots.php");
		
	$slotMachine = new CLASS_SLOTS;
	$acao = '';
	
	if (isset($_GET['a'])) {
		$acao = $_GET['a'];
	}

	switch($acao) {
		case 'bonus': 
			$slotMachine->DoBonus();
			break;
		case 'lucky':
			$slotMachine->GenSlots();
			break;
	}

?>
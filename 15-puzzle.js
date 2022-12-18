(function() {
	
	var state = 1;
	var puzzle = document.getElementById('puzzle');

	solve();
	
	puzzle.addEventListener('click', function(e) { // 옮기면 puzzle class에 animate를 추가 
		if(state == 1) {
			puzzle.className = 'animate'; // css속성을 부여하여 슬라이드로 움직이게 만듬
			shiftCell(e.target);
		}
	});
	

	document.getElementById('scramble').addEventListener('click', scramble); // 리셋기능


	function solve() {
		
		if(state == 0) {
			return;
		}
		
		puzzle.innerHTML = '';
		
		var n = 1;
		for(var i = 0; i <= 3; i++) {
			for(var j = 0; j <= 3; j++) {
				var cell = document.createElement('span');
				cell.id = 'cell-'+i+'-'+j;             // id를 넣어준다 
				cell.style.left = (j*80+1*j+1)+'px';   // j*80 : 가로 , 1*j : 보더 ,  1: 전체 위치 조절 
				cell.style.top = (i*80+1*i+1)+'px';    
				
				if(n <= 15) {                         // 15번까지 
					// cell.classList.add("number");
					cell.classList.add(`number${n}`);   // class 부여
					cell.classList.add(n);
					cell.innerHTML = (n++).toString();  // HTML에 string을 부여 
					// n++;
				} else {                              // 16번은 empty로
					cell.className = 'empty';
				}
				
				puzzle.appendChild(cell);             // cell을 만들어서 puzzle에 삽입
			}
		}
		
	}

	function shiftCell(cell) {                  
		
		if(cell.clasName != 'empty') {            // 클래스가  number라면
			
			var emptyCell = getEmptyAdjacentCell(cell); 	// 인접 셀 검사
			
			if(emptyCell) {                         // 셀 옮기기 
	
				var tmp = {style: cell.style.cssText, id: cell.id}; // 옮긴 cell 스타일과 아이디 지정
				

				cell.style.cssText = emptyCell.style.cssText; 
				cell.id = emptyCell.id; 
				emptyCell.style.cssText = tmp.style;
				emptyCell.id = tmp.id;
				
				if(state == 1) { //  cell을 움직일 때 마다 checkOrder를 검사 한다 1 즉 처음과 같다면 실행

					setTimeout(checkOrder, 150);
				}
			}
		}
		
	}


	function getCell(row, col) {  
	
		return document.getElementById('cell-'+row+'-'+col); //getCell에 아이디를 해당 클래스로 바꾼다
		
	}


	function getEmptyCell() { 
	
		return puzzle.querySelector('.empty'); // puzzle에서 .empty 를 가져와서 리턴
			
	}
	

	function getEmptyAdjacentCell(cell) {
		

		var adjacent = getAdjacentCells(cell); 
		

		for(var i = 0; i < adjacent.length; i++) {  
			if(adjacent[i].className == 'empty') {     //  지정하여 움직인 cell의 클래스가 empty와 같다면 그 cell을 리턴
				return adjacent[i];
			}
		}
		

		return false;
		
	}


	function getAdjacentCells(cell) {   
		
		var id = cell.id.split('-');   // cell의 id에 "-" 를 추가
		

		var row = parseInt(id[1]);  // parseInt 배열에 사용할 정수로 반환
		var col = parseInt(id[2]);
		
		var adjacent = [];    // 배열 생성
		

		if(row < 3){adjacent.push(getCell(row+1, col));}   // empty에 인접한 셀이 상하좌우로 움직이면 해당 배열의 숫자로 +-를 통해 바꿔준다
		if(row > 0){adjacent.push(getCell(row-1, col));}   // 결과적으로 empty와 자리를 바꿔도 해당 배열의 2차원값은 바뀌지 않는다
		if(col < 3){adjacent.push(getCell(row, col+1));}
		if(col > 0){adjacent.push(getCell(row, col-1));}
		
		return adjacent;
		
	}
	

	function checkOrder() {  // 승리조건
		

		if(getCell(3, 3).className != 'empty') {   // 3,3 자리에 empty가 아니면 리턴 
			return;
		}

		var n = 1;

		for(var i = 0; i <= 3; i++) {
			for(var j = 0; j <= 3; j++){
				if(n <= 15 && getCell(i, j).innerHTML != n.toString()) { // cell의 문자와 배열의 문자가 다르다면 리턴

					return;
				}
				n++;   // 위사항이 같다면 1씩 증가시켜 전부 확인
			} 
		}
		

		if(confirm('Congrats, You did it! \nScramble the puzzle?')) {  
			scramble();             // 승리 조건이 완성되고 문자와 다시 리셋을 할건지 여부
		}
	
	}


	function scramble() {
	
		if(state == 0) {   // state상태가 1일때 실행 
			return;
		}
		
		puzzle.removeAttribute('class');  // removeAttribute: 지정속성 제거 
		state = 0; 
		
		var previousCell;     // previous 먼저, 이른
		var i = 1;
		var interval = setInterval(function() {
			if(i <= 50){
				var adjacent = getAdjacentCells(getEmptyCell());       // empty에 인접cell들 
				if(previousCell) {
					for(var j = adjacent.length-1; j >= 0; j--) {
						if(adjacent[j].innerHTML == previousCell.innerHTML) { // 인접HTML과 움
							adjacent.splice(j, 1);       //splice: 배열의 기존 요소를 삭제,추가,변경한다
						}
					}
				}

				previousCell = adjacent[rand(0, adjacent.length-1)]; // rand 로 랜덤한 수를 받아 
				shiftCell(previousCell); 
				i++;
			} else {
				clearInterval(interval); // 리셋 한후 게임이 정상 실행 하도록 데이터를 1로 돌려서 시작가능하게함
				state = 1;
			}
		}, 5);

	}
	

	function rand(from, to) {  // random한 숫자를 정수로 바꿔 rand에 저장

		return Math.floor(Math.random() * (to - from + 1)) + from;

	}
return;
}());

'use strict';
            //https://arantius.github.io/persona-fusion-calculator/app.js
            const personaeByArcana = (function() {
                var personaeByArcana_ = {};
                for (var i = 0, persona = null; persona = personae[i]; i++) {
                    if (!personaeByArcana_[persona.arcana]) {
                    personaeByArcana_[persona.arcana] = [];
                    }
                    personaeByArcana_[persona.arcana].push(persona);
                }
                return personaeByArcana_;
            })();
            //-----------------------------------------------------------------
            //https://stackoverflow.com/questions/43821938/search-div-for-text
            function fsearch(){
                var input = document.getElementById("search");
                var filter = input.value.toLowerCase();
                var nodes = document.getElementsByClassName('persona');

                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerText.toLowerCase().includes(filter)) {
                        nodes[i].style.display = "";


                    }
                    else { nodes[i].style.display = "none"; }
                }
            }
            
            //-----------------------------------------------------------------

            //http://jsfiddle.net/hibbard_eu/C2heg/
            let sortlvl = document.getElementById('lvl');
            let sortedLevel = 0;
            sortlvl.onclick = function() {
                if (sortedLevel == 0) {
                    var $divs = $(".persona");

                    sortedLevel = 1;

                    var orderLevel = $divs.sort(function (a, b) {
                        return (($(a).find(".lvl").text()) - ($(b).find(".lvl").text()));
                    });

                    $(".con2").html(orderLevel);
                }
                else{
                    var $divs = $(".persona");

                    sortedLevel = 0;

                    var orderLevel = $divs.sort(function (a, b) {
                        return (($(b).find(".lvl").text()) - ($(a).find(".lvl").text()));
                    });
                    $(".con2").html(orderLevel);
                }
            };

            //https://arantius.github.io/persona-fusion-calculator/app.js
            function fuse2(arcana, firstPersona, secondPersona){
                let level = 1 + Math.floor((firstPersona.level + secondPersona.level) / 2);
                let personae = personaeByArcana[arcana];

                let i = 0;
                for(i in personae){
                    let persona = personae[i];

                    if(persona.level >= level){
                        if(persona.special)
                            continue;

                        break;
                    }
                }

                if(firstPersona.arcana == secondPersona.arcana)
                    i -= 1;
                
                if(personae[i] == firstPersona || personae[i] == secondPersona)
                    i -= 1;

                return personae[i];
            }

            let sortname = document.getElementById('name');
            let sortedName = 1;
            sortname.onclick = function() {
                if (sortedName == 0) {
                    var $divs = $(".persona");

                    sortedName = 1;

                    var orderName = $divs.sort(function (a, b) {
                        return $(a).find(".name").text().localeCompare($(b).find(".name").text());
                    });
                    $(".con2").html(orderName);
                }
                else{
                    var $divs = $(".persona");

                    sortedName = 0;

                    var orderName = $divs.sort(function (a, b) {
                        return $(b).find(".name").text().localeCompare($(a).find(".name").text());
                    });
                    $(".con2").html(orderName);
                }
            };

            let sortarcana = document.getElementById('arcana');
            let sortedArcana = 0;
            sortarcana.onclick = function() {
                if (sortedArcana == 0) {
                    var $divs = $(".persona");

                    sortedArcana = 1;

                    var orderArcana = $divs.sort(function (a, b) {
                        return $(a).find(".arcana").text().localeCompare($(b).find(".arcana").text());
                    });
                    $(".con2").html(orderArcana);
                }
                else{
                    var $divs = $(".persona");

                    sortedArcana = 0;

                    var orderArcana = $divs.sort(function (a, b) {
                        return $(b).find(".arcana").text().localeCompare($(a).find(".arcana").text());
                    });
                    $(".con2").html(orderArcana);
                }
            };
            
            //-----------------------------------------------------------------

            let personawindow = document.getElementsByClassName('persona');
            for(let i = 0; i < personawindow.length; i++) {
                personawindow[i].onclick = function(e) {
                    let sortBar = document.getElementById("persona")
                    let con2Add = document.getElementById("con2")

                    let x = e.target
                    let clickName = 0;

                    if (x.parentElement.classList.contains('persona')) {
                        clickName = x.parentElement.querySelector('.name').innerText;
                    } else {
                        clickName = x.querySelector('.name').innerText;
                    }

                    let personaFocus = document.createElement("div")
                        personaFocus.id = "persona"
                        con2.insertBefore(personaFocus, sortBar);

                    let emptyDiv = document.createElement("div")
                        emptyDiv.id = "lvl"
                        personaFocus.appendChild(emptyDiv)

                    let clickedPersona = document.createElement("div")
                        clickedPersona.id = "named"
                        clickedPersona.innerText = clickName
                        personaFocus.appendChild(clickedPersona)

                    let resetDiv = document.createElement('div')
                        resetDiv.id = "arcana"
                        resetDiv.innerHTML = "×"
                        personaFocus.appendChild(resetDiv)

                        resetDiv.onclick = function(){
                            $('.con2').children().removeClass('hidePersona');
                            $('.con2Res').empty();
                            $("div").remove("#persona:first-child");
                        }

                    $('.con2').children().addClass('hidePersona');

                    let demon = personae.find(y => y.name.toLowerCase() == clickName.toLowerCase())
                    let demonSpecial = arcana2Combos.filter(r => r.result.toLowerCase() == demon.arcana.toLowerCase())
                    
                    if (demon.max == true) {
                        clickedPersona.innerText += " - max social link needed"
                    }
                    if (demon.special == true) {
                        let demonS = specialCombos.find(y => y.result.toLowerCase() == demon.name.toLowerCase())

                        let sd = document.createElement("div")
                        sd.className = "persona"
                        $('.con2Res').append(sd) 

                        let emptyDiv = document.createElement("div")
                            emptyDiv.className = "lvl"
                            sd.appendChild(emptyDiv)
                        let demonResult = document.createElement('div')
                            demonResult.className = "name"
                            demonResult.innerHTML = demonS.sources.join(', ');
                            sd.append(demonResult)
                    }
                    else {               
                        for (let i = 0; i < demonSpecial.length; i++) {
                            //https://arantius.github.io/persona-fusion-calculator/app.js   
                            var combos = demonSpecial[i].source.sort()
                            let demonResult = demonSpecial[i].result;

                            var combo = []
                            for (let r = 0; r < combos.length; r++) {
                                let x = personae.filter(y => y.arcana.toLowerCase() == combos[r].toLowerCase())
                                combo.push(x)
                            }

                            var firstCombo = combo[0];
                            var secondCombo = combo[1];

                            for(let firstPersona of firstCombo){
                                let firstName = firstPersona.name;
                                for(let secondPersona of secondCombo){
                                    let secondName = secondPersona.name;
                                    if(firstName == secondName)
                                        continue;
                                        let sd = document.createElement("div")
                                            sd.className = "persona"
                                            $('.con2Res').append(sd) 
                                        let emptyDiv = document.createElement("div")
                                            emptyDiv.className = "lvl"
                                            sd.appendChild(emptyDiv)
                                        let demonResult = document.createElement('div')
                                            demonResult.className = "name"
                                            demonResult.innerHTML = `${firstPersona.name} + ${secondPersona.name}`;
                                            sd.append(demonResult)
                                }
                            }
                            //-----------------------------------------------------------------
                        }
                    }
                }
            }

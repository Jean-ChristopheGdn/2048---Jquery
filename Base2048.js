(function($) // début du pluggin
{
    let score = 0;
    $.fn.game2048 = function() //function game2048 du pluggin
    {
        $('#score').html('Score : '+ score);
        // génération du tableau (table, tr, td) vide (rempli de zéros)
       function generateMap()
        {
            let table = $('<table></table>');
            for (let y = 0; y < 4; y++)
            {
                let line = $('<tr></tr>');
                for (let x = 0; x < 4; x++)
                {
                    let cell = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    line.append(cell);
                }
                table.append(line);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'

        function generateCell(cells)
        {
            for (let i = 0; i < cells; i++)
            {
                let empty = false;

                while (empty === false) // tant que la case récupéré aléatoirement n'est pas vide
                {
                    let x = Math.floor((Math.random() * 4));
                    let y = Math.floor((Math.random() * 4));
                    var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                    if (elem[0])
                        empty = true;
                }

                let value =  Math.floor((Math.random() * 10));
                if (value != 4 )
                    value = 2;

                elem.attr('nbr', value);
                elem.text(value);
            }
        }

        function slide(elem, elem2)
        {
            MoveNbr = $(elem).attr('nbr');
            if (elem.attr('nbr') != 0)
            {   
                if(elem2.attr('nbr') == 0)
                {
                    elem.attr('nbr', 0).text('0');
                    elem2.attr('nbr', MoveNbr).text(MoveNbr);
                    move = true;
                }
                else if (elem.attr('nbr') == elem2.attr('nbr'))
                {
                    combine(elem, elem2);
                }
                  // if (elem.attr('nbr') == 2048)
                    // {
                    // alert('YOU WIN!!!');
                    // }
            }
 
        }

        function combine(elem, elem2) {
            let combine = parseInt(elem.attr('nbr')) + parseInt(elem2.attr('nbr'));
            score = combine + score;
            $('#score').html('Score = '+ score);
            elem2.attr('nbr', combine).text(combine);
            elem.attr('nbr', 0).text('0');
            move = true;
        }

        $("#newGame").on("click", newGame);

        function newGame(){
            $('table').remove();
            $('.table').game2048();
        }

        // fonction de gestion des évenements (appuie de touches)

        $('html').keydown(function(event) 
        {
            switch (event['key']) 
            {
                case 'ArrowLeft':
                move = false;
                    for (let i = 0; i < 3; i++)
                    {
                        for (let y = 0; y < 4; y++)
                        {
                            for(let x = 0; x < 4; x++)
                            {
                                let left = x - 1;
                                var elem  = $('[x="' + x + '"][y="' + y + '"]');                                
                                var elem2 = $('[x="' + left + '"][y="' + y + '"]');
                                slide(elem, elem2);
                            }
                        }    
                    }
                if (move === true)
                {
                    generateCell(1);
                }
                break;

                case 'ArrowUp':
                move = false;
                    for (let i = 0; i < 3; i++)
                    {
                        for (let y = 0; y < 4; y++)
                        {
                            for(let x = 0; x < 4; x++)
                            {
                                let up = y - 1;
                                var elem  = $('[x="' + x + '"][y="' + y + '"]');                                
                                var elem2 = $('[x="' + x + '"][y="' + up + '"]');
                                slide(elem, elem2);
                            }
                        }   
                    }
                if (move === true)
                {
                    generateCell(1);
                }
                break;

                case 'ArrowRight':
                move = false;
                    for (let i = 0; i < 3; i++)
                    {
                        for (let y = 0; y < 4; y++)
                        {
                            for(let x = 3; x >= 0; x--)
                            {
                                let right = x + 1;
                                var elem  = $('[x="' + x + '"][y="' + y + '"]');
                                var elem2 = $('[x="' + right + '"][y="' + y + '"]');
                                slide(elem, elem2);
                            }
                        }    
                    }

                if (move === true)
                {
                    generateCell(1);
                }
                break;

                case 'ArrowDown':
                move = false;
                    for (let i = 0; i < 3; i++)
                    {
                        for (let y = 3; y >= 0; y--)
                        {
                            for(let x = 0; x < 4; x++)
                            {
                                let down = y + 1;
                                var elem  = $('[x="' + x + '"][y="' + y + '"]');
                                var elem2 = $('[x="' + x + '"][y="' + down + '"]');
                                slide(elem, elem2);
                            }
                        }
                    }
                    
                if (move === true)
                {
                    generateCell(1);
                } 
                break;
            }
        });

        $(this).append(generateMap()); // génération du tableau vide
        generateCell(2); // génération aléatoire de deux cases pleines (2 ou 4)
    }

})(jQuery); 

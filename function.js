(() => {
    "use strict";

    let countries=[]

    listerAjaxRequest()

    ajaxRequest2()

    async function ajaxRequest(){

        const response= await fetch("https://restcountries.com/v3.1/all")

        countries= await response.json()

        console.log(countries)
        
        displayListCountries(countries)

      
    }

    function displayListCountries(countries){
        const myResponse1= document.getElementById("myResponse1")

        const numberOfCountries= sumOfCountries(countries)
        const sumTotalOfPopulation= sumOfPopulation(countries)
        let average= sumTotalOfPopulation / numberOfCountries


        myResponse1.innerHTML= `<p>Total countries result: ${numberOfCountries} </p>
                                <p>Total countries Population: ${sumTotalOfPopulation} </p>
                                <p>Average Population: ${average} </p>`




        table1CountriesWithPopulation(countries)  
        table2RegionWithCountries(countries)  
        table3CurrenciesWithCountries(countries)                    
        

    }

    function sumOfCountries(countries){
        return countries.length
    }

    function sumOfPopulation(countries){
        let sum=0
        for (let country of countries){
            sum+= country.population
        }
        return sum
    }

    function listerAjaxRequest(){
        const buttonAllsCountries= document.getElementById("buttonAllsCountries")

        buttonAllsCountries.addEventListener("click", ajaxRequest)
    }


    function table1CountriesWithPopulation(countries){
        const myResponse2= document.getElementById("myResponse2")

        let content=`<table class="table table-striped table-hover">
                        <thead>
                            <tr>
          
                                <th scope="col">Country Name</th>
                                <th scope="col">Number of Citizens</th>
                            </tr>
                        </thead>
                        <tbody>`


        for(let country of countries){
            content+= `  <tr>
                            <td> <img src="${country.flags.png}" style="height:50px; width:50px; border-radius:50% ;"/> ${country.name.common}</td>
                            <td>${country.population}</td>
                        </tr>`
        }

        content+= `        </tbody>
                    </table>`

        myResponse2.innerHTML= content
    }

    function table2RegionWithCountries(countries){
        const myResponse3= document.getElementById("myResponse3")

        let html=`<table class="table table-striped table-hover">
                    <thead>
                        <tr>

                            <th scope="col">Region </th>
                            <th scope="col">Number of Countries</th>
                        </tr>
                    </thead>
                    <tbody>`

        let setRegion= new Set()

        for(let country of countries){
            setRegion.add(country.region)
        }

        for( let region of setRegion){

            const sumCountries= sumCountriesWithSameRegion(countries,region)
           html+= `  <tr>
                            <td> ${region}</td>
                            <td>${sumCountries}</td>
                    </tr>`
        }

        html+=`        </tbody>
                </table>`

        myResponse3.innerHTML= html
    }


    function sumCountriesWithSameRegion(countries, region){
        
        let sum=0
        for(let country of countries){
            if(country.region=== region){
                sum++
            }
        }

        return sum
    }


    function table3CurrenciesWithCountries(countries){
        const myResponse4= document.getElementById("myResponse4")

        let contentBonus=`<table class="table table-striped table-hover">
        <thead>
            <tr>

                <th scope="col">Currency</th>
                <th scope="col">Number of Countries</th>
            </tr>
        </thead>
        <tbody>`

       
        let setCurrency= new Set()

        for(let country of countries){

            for(let currency in country.currencies){
                setCurrency.add(currency)
               

            }
        }

        for(let currency of setCurrency){
                    
                    const sumOfCountriesWithCurrencies= sumOfCountriesWithSameCurrency(countries, currency)
                    
                    contentBonus+=  `  <tr>
                                        <td> ${currency}</td>
                                        <td>${sumOfCountriesWithCurrencies}</td>
                                       </tr>`

        }

              

        contentBonus+= `        </tbody>
                            </table>`

        myResponse4.innerHTML= contentBonus

    }

    function sumOfCountriesWithSameCurrency(countries, currency){
        let sum=0
        for( let country of countries){
            for (let key in country.currencies){
                if(key===currency){
                    sum++
                }
            }
        }

        return sum
    }


    function ajaxRequest2(){

        const buttonSearch= document.getElementById("buttonSearch")

        buttonSearch.addEventListener("click",  async function(){

            const valueInput= document.getElementById("valueInput").value.toLowerCase()

            const response= await fetch(`https://restcountries.com/v3.1/name/${valueInput}`)
    
            const listCountriesSearch= await response.json()
    
            displayListCountries(listCountriesSearch)

        })

    }


})();
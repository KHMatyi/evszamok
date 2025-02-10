/**
 * @typedef {korszak:String,evszam1:String,megnev1:String,tan1:String,evszam2?:String,megnev2?:String,tan2?:String} TableRow
 * @typedef {String[]} HeaderData
 * @typedef {{text:String,id:String,option?:{value:String,text:String}[]}} FormRow
 */

const header = ["Időszak","Évszám","Esemény","Tananyag"]
const starterData = [
    {
        korszak:"XVI. század",
        evszam1:"1514",
        megnev1:"Dózsa-féle parasztháború",
        tan1:"magyar",
        evszam2:"1519-1522",
        megnev2:"Magellán körülhajózza a földet",
        tan2:"egyetemes",
    },
    {
        korszak:"XVII. század",
        evszam1:"1664",
        megnev1:"vasvári béke",
        tan1:"magyar",
    },
    {
        korszak:"XVIII. század",
        evszam1:"1701-1714",
        megnev1:"spanyol örökösödési háború",
        tan1:"egyetemes",
        evszam2:"1703-1711",
        megnev2:"Rákóczi szabadságharc",
        tan2:"magyar",
    },
    {
        korszak:"XIX. század",
        evszam1:"1812",
        megnev1:"Napóleon oroszországi hadjárata",
        tan1:"egyetemes",
        evszam2:"1809",
        megnev2:"győri csata",
        tan2:"magyar",
    },
]

const formData = [
    {
        text:"Korszak megnevezés:",
        id:"korszak",
    },
    {
        text:"1. esemény évszám:",
        id:"evszam1",
    },
    {
        text:"1. esemény megnevezés",
        id:"megnev1",
    },
    {
        text:"1. esemény tananyag:",
        id:"tan1",
        option:[
            {
                value:"",
                text:""
            },
            {
                value:"magyar",
                text:"Magyar történelem"
            },
            {
                value:"egyetemes",
                text:"Egyetemes történele"
            },
        ],
    },
    {
        text:"2. esemény évszám:",
        id:"evszam2",
    },
    {
        text:"2. esemény megnevezés:",
        id:"megnev2",
    },
    {
        text:"2. esemény tananyag:",
        id:"tan2",
        option:[
            {
                value:"",
                text:""
            },
            {
                value:"magyar",
                text:"Magyar történelem"
            },
            {
                value:"egyetemes",
                text:"Egyetemes történelem"
            },
        ],
    },
]

class T_Table{
    #table
    #tbody
    #thead
    /**
     * @param {HeaderData[]} headerData 
     * @param {HTMLElement} parent 
     * @param {TableRow[]} defaultData 
     */
    constructor(headerData, parent, defaultData = []){
        this.#table = document.createElement("table");
        parent.appendChild(this.#table);
        this.#thead = document.createElement("thead");
        this.#table.appendChild(this.#thead);
        this.#tbody = document.createElement("tbody");
        this.#table.appendChild(this.#tbody);

        this.#headmaker(headerData);

        for (const i of defaultData){
            this.addRow(i);
        }
    }
    /**
     * @param {HeaderData} headerData 
     */
    #headmaker(headerData){
        const tr = document.createElement("tr");
        this.#thead.appendChild(tr);
        for (const i of headerData) {
            const th = document.createElement("th");
            tr.appendChild(th);
            th.innerHTML = i;
        }
    }
    /**
     * @param {TableRow} row 
     */
    addRow(row){
        const tr = document.createElement("tr");
        this.#tbody.appendChild(tr);
        
        const ido = this.#tder(row.korszak, tr ,"gray");
        this.#tder(row.evszam1, tr);
        this.#tder(row.megnev1, tr, "gray");
        this.#tder(row.tan1, tr);

        if (row.evszam2 && row.megnev2 && row.tan2){
            ido.rowSpan = 2

            const tr = document.createElement("tr");
            this.#tbody.appendChild(tr);

            this.#tder(row.evszam2, tr);
            this.#tder(row.megnev2, tr, "gray");
            this.#tder(row.tan2, tr);
        }
    }
    /**
     * @param {String} key 
     * @param {HTMLElement} parent 
     * @param {string} [cl=""] 
     */
    #tder(text, parent, cl = ""){
        const td = document.createElement("td");
        parent.appendChild(td);
        td.innerHTML = text;
        td.classList += cl;
        return td;
    }
}


class F_Form{
    #form
    #errors
    #fields
    #table
    /**
     * @param {FormRow[]} formData 
     * @param {HTMLElement} parent 
     * @param {T_Table} table 
     */
    constructor(formData, parent, table){
        this.#form = document.createElement("form");
        parent.appendChild(this.#form);
        this.#fields = {};
        this.#errors = {};
        this.#table = table;

        for (const i of formData){
            this.#fields[i.id] = this.#rowadder(i);

            const p = document.createElement("p");
            this.#form.appendChild(p);
            p.id = i.id + "Err";
            this.#errors[i.id + "Err"] = p;

            this.#form.appendChild(document.createElement("br"));
        }

        const button = document.createElement("button");
        this.#form.appendChild(button);
        button.innerHTML = "Hozzáadás";

        this.#form.addEventListener("submit", this.#event);
    }
    /**
     * @param {FormRow} row 
     */
    #rowadder(row){
        const label = document.createElement("label");
        this.#form.appendChild(label);
        label.for = row.id;
        label.innerHTML = row.text;
        this.#form.appendChild(document.createElement("br"));

        if (row.option){
            const select = document.createElement("select");
            this.#form.appendChild(select)
            select.id = row.id;
            
            for (const i of row.option){
                const option = document.createElement("option");
                select.appendChild(option);
                option.value = i.value;
                option.innerHTML = i.text;
            }
            return select;

        } else {
            const input = document.createElement("input");
            this.#form.appendChild(input);

            input.type = "text";
            input.id = row.id

            return input;
        }
    }
    /**
     * @param {Event} e 
     */
    #event = (e) => {
        e.preventDefault()
        const reqformInput = {
            korszak:this.#fields.korszak.value,
            evszam1:this.#fields.evszam1.value,
            megnev1:this.#fields.megnev1.value,
            tan1:this.#fields.tan1.value,
        };
        const optFormInput = {
            evszam2:this.#fields.evszam2.value,
            megnev2:this.#fields.megnev2.value,
            tan2:this.#fields.tan2.value,
        }
        const data = this.#validate(reqformInput, optFormInput);
        if (data){
            this.#table.addRow(data);
        }
    }
    /**
     * 
     * @param {{korszak:String,evszam1:String,megnev1:String,tan1:String}} reqFormInput 
     * @param {evszam2:String,megnev2:String,tan2:String} optFormInput 
     * @returns {TableRow | null}
     */
    #validate(reqFormInput, optFormInput){
        for (const i in this.#errors){
            this.#errors[i].innerHTML = "";
        }

        let good = true;
        for (const i in reqFormInput){
            if (!reqFormInput[i]){
                this.#errors[i + "Err"].innerHTML = "Ezt a mezőt is ki kell tölteni.";
                good = false;
            }
        }

        let filledOpt = 0;
        for (const i in optFormInput){
            if (optFormInput[i]){
                filledOpt++;
            }
        }

        if (filledOpt != 3 && filledOpt != 0){
            for (const i in optFormInput){
                if (!optFormInput[i]){
                    this.#errors[i.toLowerCase() + "Err"].innerHTML = "Ezt a mezőt is ki kell tölteni.";
                }
            }
            good = false;
        } else if (filledOpt == 3) {
            for (const i in optFormInput){
                reqFormInput[i] = optFormInput[i];
            }
        }   

        if (good){
            for (const i in this.#fields){
                this.#fields[i].value = "";
            }
            return reqFormInput;
        }
        return null;
    }
}


const t = new T_Table(header,document.getElementById("table"),starterData);
const f = new F_Form(formData, document.getElementById("form"), t);
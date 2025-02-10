/**
 * @typedef {{Időszak:String,Évszám:String,Esemény:String,Tananyag:String,Évszám2:String,Esemény2:String,Tananyag2:String}} TableRow
 * @typedef {String[]} HeaderData
 * @typedef {{text:String,id:String,option:{value:String,text:String}[]}} FormRow
 */

const header = ["Időszak","Évszám","Esemény","Tananyag"]
const starterData = [
    {
        Időszak:"XVI. század",
        Évszám:"1514",
        Esemény:"Dózsa-féle parasztháború",
        Tananyag:"magyar",
        Évszám2:"1519-1522",
        Esemény2:"Magellán körülhajózza a földet",
        Tananyag2:"egyetemes",
    },
    {
        Időszak:"XVII. század",
        Évszám:"1664",
        Esemény:"vasvári béke",
        Tananyag:"magyar",
    },
    {
        Időszak:"XVIII. század",
        Évszám:"1701-1714",
        Esemény:"spanyol örökösödési háború",
        Tananyag:"egyetemes",
        Évszám2:"1703-1711",
        Esemény2:"Rákóczi szabadságharc",
        Tananyag2:"magyar",
    },
    {
        Időszak:"XIX. század",
        Évszám:"1812",
        Esemény:"Napóleon oroszországi hadjárata",
        Tananyag:"egyetemes",
        Évszám2:"1809",
        Esemény2:"győri csata",
        Tananyag2:"magyar",
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
            this.#addRow(i);
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
    #addRow(row){
        const tr = document.createElement("tr");
        this.#tbody.appendChild(tr);
        
        const ido = this.#tder(row.Időszak, tr ,"gray");
        this.#tder(row.Évszám, tr);
        this.#tder(row.Esemény, tr, "gray");
        this.#tder(row.Tananyag, tr);

        if (row.Évszám2 && row.Esemény2 && row.Tananyag2){
            ido.rowSpan = 2

            const tr = document.createElement("tr");
            this.#tbody.appendChild(tr);

            this.#tder(row.Évszám2, tr);
            this.#tder(row.Esemény2, tr, "gray");
            this.#tder(row.Tananyag2, tr);
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
    #event = (e) => {
        
    }
}


const t = new T_Table(header,document.getElementById("table"),starterData);
const f = new F_Form(formData, document.getElementById("form"), t);
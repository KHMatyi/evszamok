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
            const td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = i;
        }
    }
    /**
     * @param {TableRow} row 
     */
    #addRow(row){
        const tr = document.createElement("tr");
        this.#tbody.appendChild(tr);
        
        const ido = this.#tder(row.Időszak, tr ,".gray");
        this.#tder(row.Évszám, tr);
        this.#tder(row.Esemény, tr, ".gray");
        this.#tder(row.Tananyag, tr);

        if (row.Évszám2 && row.Esemény2 && row.Tananyag2){
            ido.rowSpan = 2

            const tr = document.createElement("tr");
            this.#tbody.appendChild(tr);

            this.#tder(row.Évszám2, tr);
            this.#tder(row.Esemény2, tr, ".gray");
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

}

const t = new T_Table(header,document.getElementById("table"),starterData);
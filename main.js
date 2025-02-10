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
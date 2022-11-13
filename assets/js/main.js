const {createApp} = Vue;

createApp({
  data(){
    
    return{      
      id : 43,
      pokemones:[],
      urlPrincipal: 'https://pokeapi.co/api/v2/pokemon/',
      urlPrev : '',
      urlNext : '',
    };
  },
  created(){
    this.traerDatos(this.urlPrincipal);
  },
  mounted() {
    	    
	
},
    methods: {
    traerDatos(url){
      this.pokemones = []
      fetch(url)
      .then(respuesta => respuesta.json())
      .then(data0 => {
        
        
        this.urlPrev = data0.previous;
        this.urlNext = data0.next;
        
        data0.results.forEach(poke => {
          fetch(poke.url)
        .then(response => response.json())
        .then(data => {
            fetch(data.species.url)
            .then(response => response.json())
            .then(data2 => {
              

              let tipos=[]
              let movimientos = []
              let habilidades = []
              let nombre = data.name
              let id = data.id
              let img = data.sprites.other.dream_world.front_default
              let estadisticas = []
              let descripcion = ""
              let especie = ""
              let growdate = data2.growth_rate.name
              let habitat = data2.habitat.name
              let captureRate = data2.capture_rate
              let baseExp = data.base_experience
              let height = data.height //esta en decimetros
              let weight = data.weight //esta en gramos
            
    
    
                data.types.forEach(element => {
                    tipos.push(element.type.name) 
                })
                data.moves.forEach(element => {
                  movimientos.push(element.move.name)
                })
                data.abilities.forEach(element => {
                  habilidades.push(element.ability.name)
              })
                     
    
                
                data.stats.forEach(element => {
                  estadisticas.push({
                    name: element.stat.name,
                    nivel: element.base_stat,
                  })              
                })
               

              descripcion = data2.flavor_text_entries[0].flavor_text

              data2.genera.forEach(element => {
                if(element.language.name === "en"){
                  especie = element.genus
                }
              })
              
               
              
              this.pokemones.push({
                name: nombre,
                tipo: tipos,
                moves: movimientos,
                habilidades: habilidades,
                img: img,
                stats: estadisticas,
                id: id,
                descripcion: descripcion,
                especie: especie,
                growdate: growdate,
                habitat: habitat,
                captureRate: captureRate,
                baseExp: baseExp,
                height: height/10,
                weight: (weight/10).toFixed(2),
              })
              this.pokemones.sort((a, b) => a.id - b.id)
              

            })            
        })
        
        })
        

      })
      console.log(this.pokemones); 
    },
    sigPag() {
      console.log('Hola desde una funcion');
      console.log(this.urlNext);
      this.traerDatos(this.urlNext);
    },
    antPag() {
      console.log('Hola desde una funcion');
      console.log(this.urlNext);
      this.traerDatos(this.urlPrev);
    },
    
  },
  computed:{    

  }
}).mount('#app')
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
    private readonly translationMap: { [key: string]: string } = {
        // Direções gerais
        "Head south": "Siga para o sul",
        "Head north": "Siga para o norte",
        "Head east": "Siga para o leste",
        "Head west": "Siga para o oeste",
        "Continue straight": "Continue em frente",
        "Turn around": "Faça o retorno",
        
        // Direções específicas
        "Turn sharp right": "Vire acentuadamente à direita",
        "Turn sharp left": "Vire acentuadamente à esquerda",
        "Turn right": "Vire à direita",
        "Turn left": "Vire à esquerda",
        "Slight right": "Vire levemente à direita",
        "Slight left": "Vire levemente à esquerda",
        
        // Rotatórias
        "Enter the roundabout": "Entre na rotatória",
        "Exit the roundabout": "Saia da rotatória",
        "Take the first exit": "Pegue a primeira saída",
        "Take the second exit": "Pegue a segunda saída",
        "Take the third exit": "Pegue a terceira saída",
        "Take the fourth exit": "Pegue a quarta saída",
        "Take the fifth exit": "Pegue a quinta saída",
      
        // Combinações com "and"
        "and take the 1st exit": "e pegue a primeira saída",
        "and take the 2nd exit": "e pegue a segunda saída",
        "and take the 3rd exit": "e pegue a terceira saída",
        "and take the 4th exit": "e pegue a quarta saída",
        "and take the 5th exit": "e pegue a quinta saída",
        
        // Chegada
        "Arrive at": "Chegue em",
        "on the left": "à esquerda",
        "on the right": "à direita",
        "Destination will be on the left": "O destino estará à esquerda",
        "Destination will be on the right": "O destino estará à direita",
        
        // Vias e interseções
        "onto": "na",
        "on": "em",
        "Merge onto": "Entre na",
        "Keep left": "Mantenha-se à esquerda",
        "Keep right": "Mantenha-se à direita",
        "Take the ramp": "Pegue a rampa",
        "Take the exit": "Pegue a saída",
        "At the intersection": "Na interseção",
        "At the traffic light": "No semáforo",
        "At the stop sign": "Na placa de pare",
        
        // Outras instruções
        "Make a U-turn": "Faça um retorno",
        "Follow the road": "Siga a estrada",
        "Continue on": "Continue na",
        "Pass by": "Passe por",
        "Take the bridge": "Pegue a ponte",
        "Take the tunnel": "Pegue o túnel",
        
        // Avisos e indicações
        "Prepare to turn right": "Prepare-se para virar à direita",
        "Prepare to turn left": "Prepare-se para virar à esquerda",
        "Stay on the current road": "Permaneça na estrada atual",
        "Road splits ahead": "A estrada se divide à frente",
        "Keep straight at the fork": "Siga em frente na bifurcação",
      
        // Direções com números dinâmicos
        "\\d+ meters": "metros",
        "\\d+ km": "km",
        "for \\d+ meters": "por \\d+ metros",
        "for \\d+ km": "por \\d+ km"
      };
      

  translate(directions: string[]): string[] {
    return directions.map((direction) => {
      let translated = direction;

      // Substitui termos no texto
      Object.keys(this.translationMap).forEach((term) => {
        const regex = new RegExp(term, 'g'); // Substitui todas as ocorrências
        translated = translated.replace(regex, this.translationMap[term]);
      });

      return translated;
    });
  }
}

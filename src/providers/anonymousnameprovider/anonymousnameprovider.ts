import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AnonymousNameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnonymousNameProvider {

  constructor(public afdb: AngularFireDatabase) {
    console.log('Hello AnonymousNameProvider Provider');
  }

  writeNamestoDB(){
    let names = [
      "Anteater", "Armadillo", "Auroch", "Axolotl", "Badger", "Bat", "Beaver", "Buffalo", "Camel", "Capybara",
      "Chameleon", "Cheetah", "Chinchilla", "Chipmunk", "Chupacabra", "Cormorant", "Coyote", "Crow", "Dingo", "Dinosaur", "Dolphin",
      "Duck", "Elephant", "Ferret", "Fox", "Frog", "Giraffe", "Gopher", "Grizzly", "Hedgehog", "Hippo", "Hyena", "Ibex", "Ifrit",
      "Iguana", "Jackal", "Kangaroo", "Koala", "Kraken", "Lemur", "Leopard", "Liger", "Llama", "Manatee", "Mink", "Monkey", "Moose", 
      "Narwhal", "Nyan Cat", "Orangutan", "Otter", "Panda", "Penguin", "Platypus", "Pumpkin", "Python", "Quagga", "Rabbit", "Raccoon",
      "Rhino", "Sheep", "Shrew", "Skunk", "Squirrel", "Tiger", "Turtle", "Walrus", "Wolf", "Wolverine", "Wombat"
    ];
    
    this.afdb.object("anonymousNames").set(names);
  }

  // getName(chatroom_id, uid): Observable<any>{
  //   let name_bindings_obvs = this.afdb.object('chatroom/' + chatroom_id + '/nameBindings').valueChanges();
  //   let name;
  //   let name_sub = name_bindings_obvs.subscribe(names =>{
  //     if(names != null && names[uid] != null){
  //      name = names[uid].name as string
  //      console.log("anonymous name: ", name);
  //      return this.afdb.object('chatroom/' + chatroom_id + '/nameBindings/' + uid).valueChanges();
  //     }else{
  //       this.setName(chatroom_id, uid);
  //     }
  //   });
  //   return null;
  // }

  getNames(chatroom_id, uid, is_instructor): Observable<any[]>{
    if(this.validate_keys([chatroom_id, uid])){
      let names_obvs = this.afdb.object('chatroom/' + chatroom_id + '/nameBindings').valueChanges();
      setTimeout(() => {
        let names_sub = names_obvs.subscribe(name_bindings => {
            if(!is_instructor && (name_bindings == null || name_bindings[uid] == null)){
                this.setName(chatroom_id, uid);
            }
          names_sub.unsubscribe();
      })}, 500);
      return this.afdb.list('chatroom/' + chatroom_id + '/nameBindings').valueChanges();
    }
  }

  getNamesObj(chatroom_id, uid, is_instructor): Observable<any>{
    if(this.validate_keys([chatroom_id, uid])){
      let names_obvs = this.afdb.object('chatroom/' + chatroom_id + '/nameBindings').valueChanges();
      let names_sub = names_obvs.subscribe(name_bindings => {
        if(!is_instructor && (name_bindings == null || name_bindings[uid] == null)){
            this.setName(chatroom_id, uid);
        }
        console.log("stuck");
        names_sub.unsubscribe();
      })
      return this.afdb.object('chatroom/' + chatroom_id + '/nameBindings').valueChanges();
    }
  }

  private setName(chatroom_id, uid){
      let is_available: boolean = false;
      let candidate_name_num = this.getNextNum(chatroom_id);
      // let candidate_obvs = this.afdb.object('chatroom/' + chatroom_id + '/takenNames/' + candidate_name_num).valueChanges();
      // let takenname_sub = candidate_obvs.subscribe(data =>{
      //   if(data == null){
      //     is_available = true;
      //   }
        let name;
        let name_sub = this.afdb.object('anonymousNames/' + candidate_name_num).valueChanges().subscribe(name_raw => {
          name = name_raw;
          this.afdb.object('chatroom/' + chatroom_id + '/takenNames/').update({
             [candidate_name_num]: uid
           });
           this.afdb.object('chatroom/' + chatroom_id + '/nameBindings').update({
            [uid] : {
              name: name,
              number: candidate_name_num
            }
          });
          name_sub.unsubscribe();
          // takenname_sub.unsubscribe();
        });
      
      // });
      candidate_name_num++;
  }

  // freeName(chatroom_id, uid){
  //   let name_num
  //   let sub = this.afdb.object('chatroom/' + chatroom_id + '/nameBindings').valueChanges().subscribe(name_bindings => {
  //     name_num = name_bindings[uid].number
  //     this.afdb.object('chatroom/' + chatroom_id + '/takenNames/' + name_num).remove();
  //     this.afdb.object('chatroom/' + chatroom_id + '/nameBindings/' + uid).remove();
  //     sub.unsubscribe();
  //   });
  // }

  validate_key(key: string): boolean
    {
        if (key != null && key != "")
        {
            console.log("key valid");
            return true;
        }
        return false;
    }

    validate_keys(keys: string[]){
      for(let key of keys){
        if(!this.validate_key(key)){
          return false;
        }
      }
      return true;
    }

    private getNextNum(chatroom_id){
      let next_name_num = -1;
      this.afdb.database.ref('chatroom/' + chatroom_id + '/last_name_num').transaction((next_num) =>{
        next_name_num = next_num;
        return next_num = next_num = next_num + 1;;
      })
      return next_name_num;
    }
  
}
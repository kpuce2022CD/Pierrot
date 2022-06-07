const schema = require('../../models/db-schema');
const fs = require('fs');

const game ={
    upload_game : async (req,res) => {
        //get csv file
        const csv = fs.readFileSync(req.file.path,"utf-8");

        //csv 읽을수 있는 형태로 변환
        const csvs = stringToCsv(csv);

        //각 오브젝트로 변환
        //ex) front_adside_right : [back_dueceside_left,~]
        const court_list = predict_next_court(csvs);
        console.log(court_list);

        //findAndUpdate from mongodb
        schema.game.findOneAndUpdate({_id : req.body._id},
        {$set:{bounce:csvs,next_bounce:court_list}},function(err,doc){
            if(err){
                console.log("Something wrong when updating data!");
                res.json(err);
            }
            res.json(doc);
        });
        
    },

    download_all_game : async (req,res) =>{
        try{
            console.log(req.body.email);
            
            const gameData = await schema.game.find({
                email:req.body.email
            });
            // await schema.game.findOne()
      
            console.log(gameData);
            res.json(gameData);
          }catch(err){
            res.json({message : err});
            console.log(err);
          }
    }

}

const stringToCsv = (csv) =>{
    const rows = csv.split("\r\n");
    if(rows[rows.length - 1]===''){
        console.log("'' has been found");
        rows.pop();
    }

    let results = [];
    let columnTitle = [];

    for(const i in rows){
        const row = rows[i];
        const data = row.split(",");
        if(i==="0"){
            columnTitle = data;
        }else{
            let row_data = {};
            for(const index in columnTitle){
                const title = columnTitle[index];
                if(title !== "court_location"){
                    if(title === "court_name"){
                        row_data[title] = data[index];
                    }else{
                        row_data[title] = parseInt(data[index]);
                    }
                }
            }
            results.push(row_data);
        }
    }
    return results;
}

const predict_next_court = (csvs) =>{
    let ll = [];
    let lc = [];
    let lr = [];
    let rl = [];
    let rc = [];
    let rr = [];

    for(index = 0; index < csvs.length-1;index++){
        console.log(index);
        switch (csvs[index].court_name) {
            case 'front_dueceside_left':
                ll.push(csvs[index+1].court_name);
                break;
            case 'front_dueceside_center':
                lc.push(csvs[index+1].court_name);
                break;
            case 'front_dueceside_right':
                lr.push(csvs[index+1].court_name);
                break;
            case 'front_adside_left':
                rl.push(csvs[index+1].court_name);
                break;
            case 'front_adside_center':
                rc.push(csvs[index+1].court_name);
                break;
            case 'front_adside_right':
                rr.push(csvs[index+1].court_name);
                break;
        }
    }

    const next_bounce = {front_dueceside_left:ll,front_dueceside_center:lc,front_dueceside_right:lr,front_adside_left:rl,front_adside_center:rc,front_adside_right:rr};
    return next_bounce;
}

module.exports = {game}
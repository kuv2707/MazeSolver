const jimp=require("jimp")

async function work()
{
    let image=await jimp.read("maze.png");
    console.log("resolution",image.bitmap.width,image.bitmap.height);
    await image.resize(1230,1230);
    await image.writeAsync("maze.png");

}
//work();
async function findSoln(PATH="maze.png",STEP=30,BLOCKS=41,start,end)
{
    let image=await jimp.read(PATH);
    let width=image.bitmap.width;
    let height=image.bitmap.height;
    console.log("resolution",image.bitmap.width,image.bitmap.height)
    let maze=[];
    for(let i=STEP/2;i<BLOCKS*STEP+STEP/2;i+=STEP)
    {
        let row=[];
        for(let j=STEP/2;j<BLOCKS*STEP+STEP/2;j+=STEP)
        {
            if(jimp.intToRGBA(image.getPixelColor(i,j)).r!=0)
            row.push(1);
            else
            row.push(0);
        }    
        maze.push(row);
    }
    // for(let i=0;i<maze.length;i++)
    // {
    //     let s="";
    //     for(let j=0;j<maze.length;j++)
    //     s+=maze[j][i]+" ";
    //     console.log(s);
    // }
    let sa=[];
    rec_solns(maze,start.x,start.y,sa,RIGHT,end.x,end.y)
    //console.log(sa.length)
    //while(sa.length!=0)
    //process.stdout.write(sa.pop()+" ")
    return [maze,sa];
}

const RIGHT="right",LEFT="left",UP="down",DOWN="up";
function rec_solns(maze,x,y,solutionPath,direction,ex,ey)
{
    if(maze[x][y]==0)
    return false;
    if(x==ex  &&  y==ey)
    return true;
    if(direction==RIGHT)
    {
        let right=rec_solns(maze,x+1,y,solutionPath,RIGHT,ex,ey);
        let up=rec_solns(maze,x,y+1,solutionPath,UP,ex,ey);
        let down=rec_solns(maze,x,y-1,solutionPath,DOWN,ex,ey);
        if(right)
        solutionPath.push(RIGHT);
        if(up)
        solutionPath.push(UP);
        if(down)
        solutionPath.push(DOWN);
        return right||up||down;
    }
    if(direction==LEFT)
    {
        let left=rec_solns(maze,x-1,y,solutionPath,LEFT,ex,ey);
        let up=rec_solns(maze,x,y+1,solutionPath,UP,ex,ey);
        let down=rec_solns(maze,x,y-1,solutionPath,DOWN,ex,ey);
        if(left)
        solutionPath.push(LEFT);
        if(up)
        solutionPath.push(UP);
        if(down)
        solutionPath.push(DOWN);
        return left||up||down;
    }
    if(direction==UP)
    {
        let right=rec_solns(maze,x+1,y,solutionPath,RIGHT,ex,ey);
        let up=rec_solns(maze,x,y+1,solutionPath,UP,ex,ey);
        let left=rec_solns(maze,x-1,y,solutionPath,LEFT,ex,ey);
        if(right)
        solutionPath.push(RIGHT);
        if(up)
        solutionPath.push(UP);
        if(left)
        solutionPath.push(LEFT);
        return right||up||left;
    }
    if(direction==DOWN)
    {
        let right=rec_solns(maze,x+1,y,solutionPath,RIGHT,ex,ey);
        let left=rec_solns(maze,x-1,y,solutionPath,LEFT,ex,ey);
        let down=rec_solns(maze,x,y-1,solutionPath,DOWN,ex,ey);
        if(right)
        solutionPath.push(RIGHT);
        if(left)
        solutionPath.push(LEFT);
        if(down)
        solutionPath.push(DOWN);
        return right||left||down;
    }
}



module.exports=findSoln
/*
LeveL Team Project #1
Mine Pet
*/

ModPE.setItem(500, "name_tag", 0, "Name Tag");

var Pet=null;
var PetMaxHp=0;
var PetHp=10;

var isMove=false;//펫이 플레이어를 따라가는것 외의 일을 할때 true
var isWorld=false;
var isBlock=false;
var isFight=false;

var AgainEnt;

var SPD=65;
var dmg=5;
var bx,by,bz;
var Sneek=false;

var thread = new java.lang.Thread(new java.lang.Runnable({
run: function()
{
for(;;)
{
	 if(Pet!=null){
  if(isBlock==false){
  if(isFight==false){
  if(Ride!="타기"){
setRotation(Pet,Player.getEntity())
}
}
}
if(isBlock){
setRotation2(Pet,bx,by,bz)
 }
if(isFight){
setRotation(Pet,AgainEnt)
 }
}

}
}}));
thread.start();

function newLevel()
{
 StartOpen();
 isWorld=true;
 Player.addItemCreativeInv(500,1,0);
 Player.addItemCreativeInv(364,1,0);
 btm("P",1,0,0,50,50,PetIfm,PetSet)
  btm("△",1,0,50,50,50,GoForward,NOPE)
}

function procCmd(cmd)
{
var Data = cmd.split(" ");
 if(Data[0]=="i")
 { 
 addItemInventory(500, 1, 0);
 }
}

function TipMsg(T)
{
 print(T)
 //ModPE.showTipMessage(T);
}

function useItem(x,y,z,i,b)
{
 if(i==500)
 {
  isBlock=true;
  isMove=true;
  bx=x;
  by=y;
  bz=z;
 }
}

function NOPE(){}

function attackHook(a,v)
{
var G = getCarriedItem();
 if(G==500)
 {
 preventDefault()
  if(v!=Pet)
  {
   Pet=v;
   TipMsg(PetName+"을 선택하였습니다")
  }
  else if(v==Pet)
 {
  Pet=null;
  TipMsg(PetName+"을 버렸습니다")
 }
}
 if(G!=500&&v!=Pet)
 {
  AgainEnt=v;
  isFight=true;
  isMove=true;
 }
 if(G==364&&v==Pet)
 {
  print(PetName+"을 회복시켰습니다")
  preventDefault()
  if(Entity.getHealth(Pet)<20)
  {
   Entity.setHealth(Pet,20)
  }
  if(Entity.getHealth(Pet)==20)
  {
   if(SPD<100){SPD+=5}
   if(dmg<20){dmg+=3}
  }
 }
}

function PetAttackHook(ent)
{
BloodEFT(ent)
 if(Entity.getHealth(ent)<=0)
 {
  Pet=null;
  TipMsg(PetName+"이 죽었습니다")
 }
}

function modTick()
{
if(Entity.getRider(Pet)!=Player.getEntity()&&Ride=="타기")
{
Entity.rideAnimal(Player.getEntity(),Pet)
}
 if(Sneek)
 {
  Slow(Pet)
 }
 if(isBlock)
 {
  PetMove(bx,by,bz)
 }
if(isFight)
{
follow(AgainEnt,Pet);
	if(BeEnt(AgainEnt,Pet)<2)
	{
	Entdmg(AgainEnt,-dmg)
	}
		if(Entity.getHealth(AgainEnt)<0)
		{
		AgainEnt=null;
		isFight=false;
		isMove=false;
	}
}
if(Pet!=null)
{
 if(BeEnt(Player.getEntity(),Pet)>3.5 && isMove==false)
 {
  follow(Player.getEntity(),Pet)
 }
  PetHp=Entity.getHealth(Pet)
	if(PetHp>PetMaxHp)
	{
  	PetMaxHp=PetHp;
	}
	 if(PetHp<PetMaxHp)
	 {
	  PetMaxHp=PetHp;
  	 PetAttackHook(Pet)//PetAttackHook 펫이 공격당할때 발동되는 함수
	 }	
	}
}

function StartOpen()
{
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({
run: function()
{
try{

var adb = new android.app.AlertDialog.Builder(ctx,android.app.AlertDialog.THEME_HOLO_DARK);
adb.setTitle("Mine Pet / Team LeveL");

adb.setMessage("Level Team Project #1\n이 스크립트는 정육면체 세계에서 스티브에게 귀여운 펫을 선사합니다\n사용법을 알고싶으시면 사용법 버튼을 눌러주세요");

adb.setNegativeButton("닫기", null);
adb.setPositiveButton("사용법", new android.content.DialogInterface.OnClickListener({
onClick: function(d,w)
{
HowToUse()
}}));

adb.show();
}catch(err) {
print(err);
}
}}));
}

function HowToUse()
{
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({
run: function()
{
try{

var adb = new android.app.AlertDialog.Builder(ctx,android.app.AlertDialog.THEME_HOLO_DARK);
adb.setTitle("Mine Pet / How to Use");
adb.setMessage("1.Name Tag로 자신이 펫으로 만들고 싶은 동물을 터치하세요 그 동물은 당신의 펫이 됩니다\n2.부수고 싶은 블럭을 터치해보세요 펫이 대신캐줍니다\n3.몬스터와의 전투에서 당신의 펫은 열심히 당신을 도와줄것입니다\n4.펫이 부상중이라면 스테이크나 고기를 이용해 체력을 회복시킬수 있습니다");

adb.setNegativeButton("확인", null);

adb.show();
}catch(err) {
print(err);
}
}}));
}

function GoForward(){
if(Ride=="타기"){
pe=Player.getEntity();
	px=Entity.getX(pe);
	py=Entity.getY(pe);
	pz=Entity.getZ(pe);
	sin=-Math.sin(Entity.getYaw(pe)/180*Math.PI);
	cos=Math.cos(Entity.getYaw(pe)/180*Math.PI);
	tan=-Math.sin(Entity.getPitch(pe)/180*Math.PI);
	pcos=Math.cos(Entity.getPitch(pe)/180*Math.PI);
	
	Entity.setVelX(Pet,sin*pcos);
	Entity.setVelY(Pet,tan);
	Entity.setVelZ(Pet,cos*pcos);
	}
}

/** Android Source **/

var TT="서기";
var Ride="내리기";
var PetName="펫";

function PetSet()
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({
run: function()
{
	try
	{
var layoutX = new android.widget.LinearLayout(ctx);
layoutX.setOrientation(1);

MakeText(layoutX,"Pet Option",18,1)

MakeText(layoutX,"Team LeveL Project #1",14,0)

var layoutX2 = new android.widget.LinearLayout(ctx);
layoutX2.setOrientation(0);

EditTextV = new android.widget.EditText(ctx);
 EditTextV.setHint("이름을 입력하세요!");
  EditTextV.setText(PetName)

EditTextV.setLayoutParams(new android.widget.LinearLayout.LayoutParams(dp(ctx,220),-2));

layoutX2.addView(EditTextV);

var button2 = new android.widget.Button(ctx);

button2.setText("확인");
button2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-2,-2));
button2.setTextColor(android.graphics.Color.argb(255,22,220,212));
button2.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v) {

PetName=EditTextV.getText().toString();
Entity.setNameTag(Pet,PetName)
//ModPE.setCamera(Pet)

}}));
layoutX2.addView(button2)
layoutX.addView(layoutX2)

MakeText(layoutX,"Pet Name",12,2)

var button22 = new android.widget.Button(ctx);

button22.setText(TT);
button22.setTextColor(android.graphics.Color.argb(255,22,220,212));
button22.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v) {

if(TT=="서기"){
TT="앉기";
//Entity.setSneeking(Pet,true);
isMove=true;
Sneek=true;
button22.setText(TT);
}else{
TT="서기"
//Entity.setSneeking(Pet,false);
isMove=false;
Sneek=false;
button22.setText(TT);
}

}}));
layoutX.addView(button22)

MakeText(layoutX,"앉기 / 서기",12,2)

var button3 = new android.widget.Button(ctx);

button3.setText(Ride);
button3.setTextColor(android.graphics.Color.argb(255,22,220,212));
button3.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v) {

if(Ride=="내리기"){
Ride="타기";
button3.setText(Ride);
Entity.rideAnimal(Player.getEntity(),Pet)
isMove=true;
}else{
Ride="내리기"
button3.setText(Ride);
px=Player.getX()
py=Player.getY()
pz=Player.getZ()
var Add=Level.spawnMob(px, py, pz, 81);
Entity.rideAnimal(Player.getEntity(),Add)
Entity.remove(Add)
isMove=false;
}

}}));
layoutX.addView(button3)

MakeText(layoutX,"Riding",12,2)

layoutX.setPadding(dp(ctx,5), dp(ctx,5), dp(ctx,5) , dp(ctx,5));

var scr = new android.widget.ScrollView(ctx);
scr.addView(layoutX);

var DisW= ctx.getWindowManager().getDefaultDisplay().getWidth();

var DisH= ctx.getWindowManager().getDefaultDisplay().getHeight();

mainWindow = new android.widget.PopupWindow(scr,DisW/2,DisH/2+dp(ctx,26),true); 
mainWindow.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(RoundRect(DisW/2,DisH/2+1,DisW/4,DisH/4+1)));
		mainWindow.setOutsideTouchable(false);
		mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT,DisW/4,DisH/4);
	}catch(err){
		clientMessage("오류발생!"+err);
	}
}}));
}

function PetIfm()
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({
run: function()
{
	try
	{
var layoutX = new android.widget.LinearLayout(ctx);
layoutX.setOrientation(1);

MakeText(layoutX,"Pet Information",18,1)

MakeText(layoutX,"Team LeveL Project #1",14,0)

//MakeLine(layoutX)

Progress = new android.widget.SeekBar(ctx);
Progress.setMax(20);
Progress.setProgress(Entity.getHealth(Pet));
Progress.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged: function(seekBar,progress,fromUser)
{

if(progress!=Entity.getHealth(Pet)){
Progress.setProgress(Entity.getHealth(Pet));
}

}}));
layoutX.addView(Progress)

MakeText(layoutX,"현재 체력 : "+Entity.getHealth(Pet),12,2)

Progress2 = new android.widget.SeekBar(ctx);
Progress2.setMax(100);
Progress2.setProgress(SPD);
Progress2.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged: function(seekBar,progress,fromUser)
{

if(progress!=SPD){
Progress2.setProgress(SPD);
}

}}));
layoutX.addView(Progress2)

MakeText(layoutX,"현재 속도 : "+SPD+"%",12,2)

Progress3 = new android.widget.SeekBar(ctx);
Progress3.setMax(20);
Progress3.setProgress(dmg);
Progress3.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged: function(seekBar,progress,fromUser)
{

if(progress!=dmg){
Progress3.setProgress(dmg);
}

}}));
layoutX.addView(Progress3)

MakeText(layoutX,"현재 공격력 : "+dmg,12,2)

layoutX.setPadding(dp(ctx,5), dp(ctx,5), dp(ctx,5) , dp(ctx,5));

var scr = new android.widget.ScrollView(ctx); 
scr.addView(layoutX);

var DisW= ctx.getWindowManager().getDefaultDisplay().getWidth();

var DisH= ctx.getWindowManager().getDefaultDisplay().getHeight();

mainWindow = new android.widget.PopupWindow(scr,DisW/2,DisH/2+dp(ctx,26),true); 
mainWindow.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(RoundRect(DisW/2,DisH/2+1,DisW/4,DisH/4+1)));
		mainWindow.setOutsideTouchable(false);
		mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT,DisW/4,DisH/4);
	}catch(err){
		clientMessage("오류발생!"+err);
	}
}}));
}

function circle(W,H,X,Z,R)
{
var bitmap = new android.graphics.Bitmap.createBitmap(W,H,android.graphics.Bitmap.Config.ARGB_8888)
var canvas = new android.graphics.Canvas(bitmap)
var paintI = new android.graphics.Paint()
var paintO = new android.graphics.Paint()
paintI.setARGB(250,235,235,235)
paintO.setARGB(150,22,220,212)
canvas.drawCircle(X,Z,R+15,paintO)
canvas.drawCircle(X,Z,R,paintI)
return bitmap;
}

function RoundRect(W,H,width,height)
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var bitmap = new android.graphics.Bitmap.createBitmap(W,H,android.graphics.Bitmap.Config.ARGB_8888)
var canvas = new android.graphics.Canvas(bitmap)
var paintO = new android.graphics.Paint()
paintO.setARGB(250,40,40,40)
var paintI = new android.graphics.Paint()
paintI.setARGB(250,220,220,220)

canvas.drawRoundRect(new android.graphics.RectF(0, 0, dp(ctx,width), dp(ctx,height)), dp(ctx,10), dp(ctx,10), paintI);

canvas.drawRoundRect(new android.graphics.RectF(dp(ctx,3), dp(ctx,3), dp(ctx,width) - dp(ctx,3), dp(ctx,height) - dp(ctx,3)), dp(ctx,10), dp(ctx,10), paintO);
return bitmap;
}


var N=0;
var title=[];
var Line=[];

function MakeText(LN,T,S,B)//New Layouts Text
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
try
{

title[N] = new android.widget.TextView(ctx);
title[N].setGravity(android.view.Gravity.CENTER);
title[N].setText(T);
title[N].setTextSize(S);
if(B==2)
{
title[N].setTextColor(android.graphics.Color.argb(250,255,153,10));//skyBlue
}
if(B==1)
{
title[N].setTextColor(android.graphics.Color.argb(250,22,220,212));//skyBlue
}
if(B==0)
{
title[N].setTextColor(android.graphics.Color.argb(250,220,220,220));//skyBlue
}
LN.addView(title[N]);
}catch(err){
print("오류발생!");
}
N++;
}

function MakeLine(LN)//New Layouts Text
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
try
{

Line[N] = new android.widget.TextView(ctx);
Line[N].setGravity(android.view.Gravity.CENTER);
Line[N].setText("");
Line[N].setTextSize(5);
Line[N].setTextColor(android.graphics.Color.argb(255,40,150,130));//Blue
Line[N].setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color. argb(255,210,210,210) ));
LN.addView(Line[N]);
}catch(err){
print("오류발생!");
}
N++;
}

function dp(ctx,dips)
{
return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

var w=[];
var num=0;

function btm(T,F,X,Y,W,H,FN,FS)//Button make
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{

w[num] = new android.widget.PopupWindow();
var layout = new android.widget.RelativeLayout(ctx);
var button = new android.widget.Button(ctx);

button.setText(T);
button.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(circle(200,200,100,100,70)));
button.setTextColor(android.graphics.Color.argb(255,40,40,40));
button.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v) {

FN();

}}));
button.setOnLongClickListener(new android.view.View.OnLongClickListener({
onLongClick : function() {

FS();

return true;
}}));
layout.addView(button);

if(F==1)
{
w[num].setContentView(layout);
w[num].setWidth(dp(ctx, W));
w[num].setHeight(dp(ctx, H));
w[num].setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(0,0,0,0)))
w[num].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, dp(ctx,X), dp(ctx,Y));
}
if(F==2)
{
w[num].setContentView(layout);
w[num].setWidth(dp(ctx, W));
w[num].setHeight(dp(ctx, H));
w[num].setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(0,0,0,0)))
w[num].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.BOTTOM, dp(ctx,X), dp(ctx,Y));
}
if(F==3)
{
w[num].setContentView(layout);
w[num].setWidth(dp(ctx, W));
w[num].setHeight(dp(ctx, H));
w[num].setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(0,0,0,0)));
w[num].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, dp(ctx,X), dp(ctx,Y));
}
if(F==4)
{
w[num].setContentView(layout);
w[num].setWidth(dp(ctx, W));
w[num].setHeight(dp(ctx, H));
w[num].setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w[num].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, dp(ctx,X), dp(ctx,Y));
}
num++;
}catch(error){
print("에러발생"+error);
}
} }));
}

/** ModePE Source **/

function Entdmg(ents,fact)//엔디티 데미지 
{
 var mh= Entity.getHealth(ents);
 Entity.setHealth(ents,mh+fact);
}

function SF(ent,time)
{
 Entity.setFireTicks(ent,time);
}

function Playerdmg(number)//플레이어 데미지
{
Player.setHealth(Entity.getHealth(getPlayerEnt())+number);
}

function BeEnt(ent,ent2) 
{
 startX=Entity.getX(ent);
 startY=Entity.getY(ent);
 startZ=Entity.getZ(ent);
 
 endX=Entity.getX(ent2);
 endY=Entity.getY(ent2);
 endZ=Entity.getZ(ent2);
 return Math.sqrt(Math.pow(startX-endX,2)+Math.pow(startZ-endZ,2)+Math.pow(startY-endY,2));
}

function follow(A,B)//B를 A로 따라가게하기
{
var X = Entity.getX(A) - Entity.getX(B);
var Y = Entity.getY(A)-1 - Entity.getY(B);
var Z = Entity.getZ(A) - Entity.getZ(B);
Side = BeEnt(A,B);

var EX=Math.floor(Entity.getX(B));
var EY=Math.floor(Entity.getY(B));
var EZ=Math.floor(Entity.getZ(B));

setVelX(B, X/Side/5*SPD/100);
setVelZ(B, Z/Side/5*SPD/100);

if(RoundGetTile(Pet,0)&&RoundGetTile(Pet,8)&&RoundGetTile(Pet,9)&& RoundGetTile(Pet,31)&&RoundGetTile(Pet,175))
{
setVelY(B,0.3)
}

}

function RoundGetTile(ent,Block)
{
 var EX=Entity.getX(ent);
 var EY=Entity.getY(ent);
 var EZ=Entity.getZ(ent);
 if(Level.getTile(EX+1,EY,EZ)!=Block|| Level.getTile(EX,EY,EZ+1)!=Block|| Level.getTile(EX-1,EY,EZ)!=Block||
Level.getTile(EX,EY,EZ-1)!=Block||
Level.getTile(EX+1,EY,EZ+1)!=Block|| Level.getTile(EX-1,EY,EZ-1)!=Block|| Level.getTile(EX-1,EY,EZ+1)!=Block|| Level.getTile(EX+1,EY,EZ-1)!=Block)
{
	return true;
	}
	return false;
}

function EntExplode(ent,p) 
{
 startX=Entity.getX(ent);
 startY=Entity.getY(ent);
 startZ=Entity.getZ(ent);
 explode(startX,startY,startZ,p);
}

function BloodEFT(ent)
{
 X=Entity.getX(ent);
 Y=Entity.getY(ent);
 Z=Entity.getZ(ent);
 setTile(X,Y,Z,35,14);//Red Wool?
 Level.destroyBlock(X,Y,Z,false);
}

function setRotation(a, b) {
var x = Entity.getX(b) - Entity.getX(a);
var y = Entity.getY(b) - Entity.getY(a);
var z = Entity.getZ(b) - Entity.getZ(a);
var l = Math.sqrt(x * x + z * z);
var c = x / l;
var d = z / l;
var e = x / z;
var f = Math.acos(z / l) * 180 / Math.PI;
var g = Math.atan(y / l);
var h = 0;
if (c > 0 && d > 0 && e > 0) h = 360 - f;
else if (c > 0 && d < 0 && e < 0) h = 360 - f;
else if (c < 0 && d < 0 && e > 0) h = f;
else if (c < 0 && d > 0 && e < 0) h = f;
else if (d == 1) h = 0;
else if (c == 1) h = 90;
else if (d == -1) h = 180;
else if (c == -1) h = 270;
else if (c == 0 && d == 1 && e == 0) null;
var i = g;
i = -1 * i * 180 / Math.PI;
Entity.setRot(a, h, i)
}

function setRotation2(a,X,Y,Z) {
var x = X - Entity.getX(a);
var y = Y - Entity.getY(a);
var z = Z - Entity.getZ(a);
var l = Math.sqrt(x * x + z * z);
var c = x / l;
var d = z / l;
var e = x / z;
var f = Math.acos(z / l) * 180 / Math.PI;
var g = Math.atan(y / l);
var h = 0;
if (c > 0 && d > 0 && e > 0) h = 360 - f;
else if (c > 0 && d < 0 && e < 0) h = 360 - f;
else if (c < 0 && d < 0 && e > 0) h = f;
else if (c < 0 && d > 0 && e < 0) h = f;
else if (d == 1) h = 0;
else if (c == 1) h = 90;
else if (d == -1) h = 180;
else if (c == -1) h = 270;
else if (c == 0 && d == 1 && e == 0) null;
var i = g;
i = -1 * i * 180 / Math.PI;
Entity.setRot(a, h, i)
}
function BePet(x,y,z){
var X = x - Entity.getX(Pet);
var Y = y - Entity.getY(Pet);
var Z = z - Entity.getZ(Pet);
 return Math.sqrt(Math.pow(X,2)+Math.pow(Z,2)+Math.pow(Y,2));
}

function PetMove(x,y,z)
{
if(BePet(x,y,z)>3){
 var X = x - Entity.getX(Pet);
 var Y = y - Entity.getY(Pet);
 var Z = z - Entity.getZ(Pet);

 Side = BePet(x,y,z)
 setVelX(Pet, X/Side/5*SPD/100);
 setVelZ(Pet, Z/Side/5*SPD/100);
 }
if(BePet(x,y,z)<3){
 Level.destroyBlock(x, y, z, true)
 isMove=false;
 isBlock=false;
 }
}

function Slow(ent){
 setVelX(ent,0)
 setVelZ(ent,0)
}

function leaveGame() {
    Pet=null;
	//thread.stop();
}

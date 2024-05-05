
import myImg from "../assets/image.png";

function Post({data}) {
  var created_date = new Date(data.date);

var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var year = created_date.getFullYear();
var month = months[created_date.getMonth()];
var date = created_date.getDate();
var hour = ""+created_date.getHours()
Number(hour)>10? hour=hour:hour="0"+hour
var min = ""+created_date.getMinutes();
Number(min)>10? min=min:min="0"+min

var time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min  ; 


  return (
    <div className="flex flex-col border rounded-lg border-zinc-300 post bg-white mb-4" role="post">
      <div className="flex px-2 pt-2 justify-between   items-center ">
        <div className="flex gap-2 items-center hover:cursor-pointer orange ">
          <div className="h-8 w-8  rounded-full border border-zinc-200 overflow-hidden">
            <img
              className="w-full"
              src={data.user.image ? data.user.image : myImg}
              alt=""
            />
          </div>
          <div>
            <h2 className="text-md font-medium">@{data.user.userName}</h2>
          </div>
        </div>

      </div>
      <h2 className="text-sm ms-3 mb-1 text-zinc-400">{time}</h2>


      <div className="max-h-80 overflow-hidden">
        <img src={data.image} alt="" className="w-full" />
      </div>
      <div className="p-4 text-wrap w-full">
        <h1 className="font-bold text-lg">{data.title}</h1>
        <p className="text-wrap w-full break-words">{data.body}</p>
      </div>
    </div>
  );
}

export default Post;

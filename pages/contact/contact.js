// Create Scaledrone
const drone = new Scaledrone("Jl84aftgSCXHKqml");

drone.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');

    const room = drone.subscribe("message", {
        historyCount: 100 // ask for the 100 latest messages from history
    });

    room.on('open', error => {
        if (error) {
            return console.error(error);
        }
        console.log('Successfully joined room');
    });

    room.on("history_message", ({ data }) => {
        addLastToTop(data);
    });

    room.on("data", data => {
        addLastToTop(data);
    });
});

drone.on("close", event => console.log("Connection ended", event));
drone.on("error", error => console.error(error));

// Listen to events
$("button").click(() => {
  const plaintext = $("textarea").val();
  if (!plaintext) {
    return;
  }
  drone.publish({
    room: "message",
    message: {
      	key: plaintext,
    },
  });
  $("textarea").val('');
});

function addLastToTop(item) {
  $(".messages").prepend(createItem(item));
}

function createItem(item) {
  const {key} = item;
  const elem = document.createElement("div");
  elem.appendChild(document.createTextNode(`${key}`));
  elem.className = 'message';
  return elem;
}




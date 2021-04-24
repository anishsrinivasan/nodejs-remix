export default async ({ httpServer }: { httpServer: any }) => {
  const io = require("socket.io")(httpServer);
  io.on("connection", function (socket: any) {
    console.log(`New connection: ${socket.id}`);
    socket.on("disconnect", () =>
      console.log(`Connection left (${socket.id})`)
    );
  });
  console.log("Socket Initialized");
};

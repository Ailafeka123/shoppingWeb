const path = require('path');
module.exports = {
    entry: "./src/index.js", // 你的進入點
    output: {
      path: path.resolve(__dirname, "dist"), // ✅ 絕對路徑，指定輸出資料夾
      filename: "bundle.js", // ✅ 這裡應該只是檔案名稱，不要加 "/"
    },
    module:{
      rules:[
        {
          test:/.js$/,
          exclude:/node_modules/,
          use:{
              loader:'babel-loader',
              options:{
                  presets:[
                      '@babel/preset-react',
                      '@babel/preset-env'
                  ],  
              },
          },
        },
        {
          test:/\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        }
      ],

    },
    devServer:{
            static:{
                directory: path.join(__dirname,'dist'),
            },
            port: 8080,
            open:true,
        },
    mode: "development",
  };
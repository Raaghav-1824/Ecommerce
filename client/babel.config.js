module.exports = {
    "plugins": [
      [
        "babel-plugin-import",
        {
          "libraryName": "@mui/material",
          "libraryDirectory": "", // This means it looks in the root of @mui/material
          "camel2DashComponentName": false // Keep the original component name casing
        },
        "mui-material-imports"
      ],
      [
        "babel-plugin-import",
        {
          "libraryName": "@mui/icons-material",
          "libraryDirectory": "",
          "camel2DashComponentName": false
        },
        "mui-icons-imports"
      ]
    ]
  }
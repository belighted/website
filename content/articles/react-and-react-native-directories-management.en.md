---
lang: en
slug: react-and-react-native-directories-management
originalPath: https://www.belighted.com/blog/react-and-react-native-directories-management
title: React and React Native Directories Management
author: Simon H.
description: How to create absolute pathways for React and React Native
  directories instead of relative. Step-by-step instructions and examples to
  handle folders and assets.
image: null
date: 1483228800000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
If you use React or React Native, you may have noticed your directory pathways sometimes look like this when you want to import something from another folder inside your components:

`import NavigationBar from '../../../components/ui/NavigationBar;`

  
Those ‘../../..’ are a nightmare to handle in your project and can be a real mess when you want to keep your project maintanable for everyone.

In this article, we will explore a better way to handle folders inside React and React native applications.

First, lets talk about React directories. (You can  jump directly to the part about [React native](#react-native)  directories, if you wish.)

#### React

In our projects we use webpack as a bundler for javascript. But the problem is that the directory path is relative, not absolute. I have found a really nice way to get rid of this relative path and change it to an absolute path.

First, you’ll have to create your ‘webpack.config.js’ file and put your basic webpack configuration .  
(You can find mine on the React project at the end of this article.)

In Webpack 3.x, you have an object called [resolve](https://webpack.js.org/configuration/resolve/#resolve).

Inside this object, we can use an object called [alias](https://webpack.js.org/configuration/resolve/#resolve-alias).

The alias is the same as the one you can use inside a ‘bash\_profile’ file. It’s a shortcut to handle your import more easily (it also works with require()).

In our projects we use these aliases (not a complete list):

`const path = require('path');  
...  
module.exports = {  
   ...  
   resolve: {  
   alias: {  
      Actions: path.resolve(__dirname, 'src/actions/'),  
      Components: path.resolve(__dirname, 'src/components/'),  
      ...  
      },  
   },  
   ...  
}`

  
The ‘src/components’ is the absolute link from your config file to your folder.

Now that you have specified this in your config file, you can change your component from this:

`import NavigationBar from '../../../components/ui/NavigationBar';`

  
to this:

`import NavigationBar from 'Components/ui/NavigationBar';`

  
Much better, right? And you can do it for other directories in addition to the one for React.

If you are using Webpack 2.x, you can also use the [alias](https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories) inside the resolve.

#### React native

Inside React native, Metro bundler is the packager of the project. It behaves a little differently.

You don’t need to create aliases. What you have to do is create a ‘package.json’ file at the root of the directory to be used with an absolute path.

Inside the ‘package.json’ file, you have to name it. Your file will look like this:

`{  
   "name": "Reducers"  
}`

  
Here is an example of the architecture before:

`src/  
   |_ actions/  
   |_ assets/  
      |_ fonts/  
      |_ images/  
         |_ branding/  
         |_ placeholders/  
   |_ components/  
      |_ ui/  
         |_ NavigationBar.js  
      |_ commons/  
   |_ configs/  
      |_ firebase  
      |_ routes  
   |_ containers/  
   |_ helpers/  
   |_ reducers/  
   |_ styles/  
   |_ types/  
package.json`

  
And here is the architecture after:

`src/  
   |_ actions/  
   |_ assets/  
      |_ fonts/  
      |_ images/  
         |_ branding/  
         |_ placeholders/  
         |_ package.json  
   |_ components/  
      |_ ui/  
         |_ NavigationBar.js  
      |_ commons/  
      |_ package.json  
   |_ configs/  
      |_ firebase  
      |_ routes  
   |_ containers/  
   |_ helpers/  
   |_ reducers/  
   |_ styles/  
   |_ types/  
package.json`

You can read up on the documentation for the naming of your [package.json name](/content/images/legacy/tzMs-PwIxQIUNaBgx0dz0.png')} />`

  
But the directory path is still not great, as we saw before. Let's walk through how to improve it step by step below.

#### Step 1:

First we move the require inside a variable. While this is a good start, at this point we're just moving the problem to a different location in the same file.

`const logo = require('../../assets/images/logo.png');  
...  
<Image source={logo} />`

####   
Step 2:

Next, we create a file that’s going to handle the images for us. Then we can use the file in several locations.

`**images.js**  
  
const logo = require('./logo.png');  
  
const Images = {  
   logo,  
};  
  
export default Images;  
  
**container.js**  
  
import Images from '../assets/Images';  
...  
<Image source={Images.logo} />`

  
It’s getting better but we still have this relative link. If we apply the technique that we talked about earlier, we can create an absolute link that we can use directly.

#### Step 3

`import Images from '@assets/Images';  
...  
<Image source={Images.logo} />`

  
Now, the absolute links are going to remain valid even if we move our assets directory or the component for any reason.  A relative link would mean changing the import everywhere.

You only have to deal with the images inside the ‘images.js’ file. 

#### Examples

You can find examples for React and React Native management on Belighted’s Github right here:

*   **[React](https://github.com/belighted/react-management)**
*   **[React native](https://github.com/belighted/react-native-management)**

I hope you've found this helpful. If you have a minute, please share it and spread the word for better directories management!  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)
"use strict";
/**
 * 交集类型将多种类型合并为一个。这使您可以将现有类型添加到一起，以获得具有所需所有功能的单一类型。
 * 例如，Person & Serializable & Loggable是Person 和 Serializable 和 Loggable。这意味着这种类型的对象将具有所有三种类型的所有成员。
 * 纠错 您将主要看到用于mixin的交集类型以及其他不适合经典面向对象模型的概念。（JavaScript中有很多！）下面是一个简单的例子，展示了如何创建一个mixin：
 */

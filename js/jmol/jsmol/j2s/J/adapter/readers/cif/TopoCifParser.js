Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.readers.cif.CifReader", "J.adapter.smarter.Atom", "$.Bond", "JU.Lst", "$.P3"], "J.adapter.readers.cif.TopoCifParser", ["java.lang.Double", "$.Exception", "$.Float", "java.util.Hashtable", "JU.BS", "J.adapter.readers.cif.Cif2DataParser", "JS.SymmetryOperation"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reader = null;
this.atoms = null;
this.nodes = null;
this.links = null;
this.nets = null;
this.singleNet = null;
this.netCount = 0;
this.linkCount = 0;
this.atomCount = 0;
this.temp1 = null;
this.temp2 = null;
this.ac0 = -1;
this.bc0 = 0;
this.cifParser = null;
this.failed = null;
this.ops = null;
this.i0 = 0;
this.b0 = 0;
this.allowedTypes = null;
this.netNotes = "";
this.sym = null;
if (!Clazz.isClassDefined ("J.adapter.readers.cif.TopoCifParser.TNet")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TNet$ ();
}
if (!Clazz.isClassDefined ("J.adapter.readers.cif.TopoCifParser.TAtom")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TAtom$ ();
}
if (!Clazz.isClassDefined ("J.adapter.readers.cif.TopoCifParser.TNode")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TNode$ ();
}
if (!Clazz.isClassDefined ("J.adapter.readers.cif.TopoCifParser.TLink")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TLink$ ();
}
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "TopoCifParser", null, J.adapter.readers.cif.CifReader.Parser);
Clazz.prepareFields (c$, function () {
this.atoms =  new JU.Lst ();
this.nodes =  new JU.Lst ();
this.links =  new JU.Lst ();
this.nets =  new JU.Lst ();
this.temp1 =  new JU.P3 ();
this.temp2 =  new JU.P3 ();
});
c$.getBondType = Clazz.defineMethod (c$, "getBondType", 
function (type, order) {
type = type.toUpperCase ();
if (type.equals ("V")) return (order == 0 ? 1 : order);
switch (type.charAt (0)) {
case 'V':
return 14;
}
if (type.length > 3) type = type.substring (0, 3);
return Math.max (1, Clazz.doubleToInt (J.adapter.readers.cif.TopoCifParser.linkTypes.indexOf (type) / 3));
}, "~S,~N");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setReader", 
function (reader) {
if (!reader.checkFilterKey ("TOPOL")) {
reader.appendLoadNote ("This file has Topology analysis records.\nUse LOAD \"\" {1 1 1} FILTER \"TOPOL\"  to load the topology.");
return this;
}this.reader = reader;
var types = reader.getFilter ("TOPOS_TYPES=");
if (types == null) types = reader.getFilter ("TOPOS_TYPE=");
if (types != null && types.length > 0) {
types = "+" + types.toLowerCase () + "+";
this.allowedTypes = types;
}this.i0 = reader.baseAtomIndex;
this.b0 = reader.baseBondIndex;
return this;
}, "J.adapter.readers.cif.CifReader");
Clazz.overrideMethod (c$, "processBlock", 
function (key) {
if (this.reader == null || this.failed != null) {
return false;
}if (this.ac0 < 0) {
this.ac0 = this.reader.asc.ac;
this.bc0 = this.reader.asc.bondCount;
}if (this.reader.ucItems != null) {
this.reader.allow_a_len_1 = true;
for (var i = 0; i < 6; i++) this.reader.setUnitCellItem (i, this.reader.ucItems[i]);

}this.reader.parseLoopParameters (J.adapter.readers.cif.TopoCifParser.topolFields);
this.cifParser = this.reader.cifParser;
if (key.startsWith ("_topol_net")) {
this.processNets ();
} else if (key.startsWith ("_topol_link")) {
this.processLinks ();
} else if (key.startsWith ("_topol_node")) {
this.processNodes ();
} else if (key.startsWith ("_topol_atom")) {
this.processAtoms ();
}return true;
}, "~S");
Clazz.overrideMethod (c$, "ProcessRecord", 
function (key, data) {
if (key.startsWith ("_topol_net")) {
this.processSingleNet (key, data);
}}, "~S,~S");
Clazz.defineMethod (c$, "processSingleNet", 
 function (key, data) {
if (key.equals (J.adapter.readers.cif.TopoCifParser.topolFields[0])) {
var n = this.reader.parseIntStr (data);
if (n == -2147483648) {
} else {
if (this.singleNet == null) {
this.nets.addLast (this.singleNet = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TNet, this, null, this.netCount++, n, "Net" + n, null));
} else {
this.singleNet.id = n;
}return;
}} else if (key.equals (J.adapter.readers.cif.TopoCifParser.topolFields[2])) {
if (this.singleNet == null) {
this.nets.addLast (this.singleNet = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TNet, this, null, this.netCount++, 1, null, data));
} else {
this.singleNet.specialDetails = data;
}return;
} else if (!key.equals (J.adapter.readers.cif.TopoCifParser.topolFields[1])) {
return;
}if (this.singleNet == null) {
this.nets.addLast (this.singleNet = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TNet, this, null, this.netCount++, 1, data, null));
} else {
this.singleNet.label = data;
}}, "~S,~S");
Clazz.defineMethod (c$, "processNets", 
 function () {
while (this.cifParser.getData ()) {
var id = this.getInt (this.getDataValue (0));
if (id < 0) id = 0;
var netLabel = this.getDataValue (1);
var net = this.getNetFor (id, netLabel);
net.specialDetails = this.getDataValue (2);
net.line = this.reader.line;
}
});
Clazz.defineMethod (c$, "processLinks", 
 function () {
while (this.cifParser.getData ()) {
var type = ("" + this.getDataValue (22)).toLowerCase ();
if (this.allowedTypes != null && this.allowedTypes.indexOf ("+" + type + "+") < 0) continue;
var link = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TLink, this, null);
link.type = type;
var t1 =  Clazz.newIntArray (3, 0);
var t2 =  Clazz.newIntArray (3, 0);
var n = this.cifParser.getColumnCount ();
for (var i = 0; i < n; ++i) {
var p = this.reader.fieldProperty (i);
var field = this.reader.field;
switch (p) {
case 3:
link.id = this.getInt (field);
break;
case 4:
var id = this.getInt (field);
if (id == -2147483648) {
link.netLabel = field;
} else {
link.netID = this.getInt (field);
}break;
case 5:
link.nodeIds[0] = this.getInt (field);
break;
case 6:
link.nodeIds[1] = this.getInt (field);
break;
case 9:
case 7:
link.atomLabels[0] = field;
break;
case 10:
case 8:
link.atomLabels[1] = field;
break;
case 52:
case 11:
link.symops[0] = this.getInt (field) - 1;
break;
case 56:
case 16:
link.symops[1] = this.getInt (field) - 1;
break;
case 25:
link.topoOrder = this.getInt (field);
break;
case 60:
case 53:
case 54:
case 55:
case 12:
case 13:
case 14:
case 15:
t1 = this.processTranslation (p, t1, field);
break;
case 61:
case 57:
case 58:
case 59:
case 17:
case 18:
case 19:
case 20:
t2 = this.processTranslation (p, t2, field);
break;
case 21:
link.cartesianDistance = this.getFloat (field);
break;
case 23:
link.multiplicity = this.getInt (field);
break;
case 24:
link.voronoiAngle = this.getFloat (field);
}
}
if (!link.setLink (t1, t2, this.reader.line)) {
this.failed = "invalid link! " + link;
return;
}this.links.addLast (link);
}
});
Clazz.defineMethod (c$, "processNodes", 
 function () {
while (this.cifParser.getData ()) {
var node = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TNode, this, null);
var t =  Clazz.newIntArray (3, 0);
var n = this.cifParser.getColumnCount ();
for (var i = 0; i < n; ++i) {
var p = this.reader.fieldProperty (i);
var field = this.reader.field;
switch (p) {
case 26:
node.id = this.getInt (field);
break;
case 28:
node.label = field;
break;
case 27:
node.netID = this.getInt (field);
break;
case 29:
node.atomLabel = field;
break;
case 30:
node.symop = this.getInt (field) - 1;
break;
case 31:
case 32:
case 33:
case 34:
t = this.processTranslation (p, t, field);
break;
case 38:
node.formula = field;
break;
case 35:
node.x = this.getFloat (field);
break;
case 36:
node.y = this.getFloat (field);
break;
case 37:
node.z = this.getFloat (field);
break;
}
}
if (node.setNode (t, this.reader.line)) this.nodes.addLast (node);
}
});
Clazz.defineMethod (c$, "processAtoms", 
 function () {
while (this.cifParser.getData ()) {
var atom = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TAtom, this, null);
var t =  Clazz.newIntArray (3, 0);
var n = this.cifParser.getColumnCount ();
for (var i = 0; i < n; ++i) {
var p = this.reader.fieldProperty (i);
var field = this.reader.field;
switch (p) {
case 39:
atom.id = this.getInt (field);
break;
case 40:
atom.atomLabel = field;
break;
case 41:
atom.nodeID = this.getInt (field);
break;
case 42:
atom.linkID = this.getInt (field);
break;
case 43:
atom.symop = this.getInt (field) - 1;
break;
case 44:
case 45:
case 46:
case 47:
t = this.processTranslation (p, t, field);
break;
case 48:
atom.x = this.getFloat (field);
break;
case 49:
atom.y = this.getFloat (field);
break;
case 50:
atom.z = this.getFloat (field);
break;
case 51:
atom.formula = field;
break;
}
}
if (atom.setAtom (t, this.reader.line)) this.atoms.addLast (atom);
}
});
Clazz.defineMethod (c$, "processTranslation", 
 function (p, t, field) {
switch (p) {
case 60:
case 61:
case 12:
case 17:
case 31:
case 44:
t = J.adapter.readers.cif.Cif2DataParser.getIntArrayFromStringList (field, 3);
break;
case 53:
case 57:
case 13:
case 18:
case 32:
case 45:
t[0] = this.getInt (field);
break;
case 54:
case 58:
case 14:
case 19:
case 33:
case 46:
t[1] = this.getInt (field);
break;
case 55:
case 59:
case 15:
case 20:
case 34:
case 47:
t[2] = this.getInt (field);
break;
}
return t;
}, "~N,~A,~S");
Clazz.overrideMethod (c$, "finalizeReader", 
function () {
if (this.reader == null || this.reader.symops == null) return false;
this.cifParser = null;
this.reader.applySymmetryToBonds = true;
var symops = this.reader.symops;
var nOps = symops.size ();
this.ops =  new Array (nOps);
for (var i = 0; i < nOps; i++) {
this.ops[i] = JS.SymmetryOperation.getMatrixFromXYZ ("!" + symops.get (i));
}
for (var i = 0; i < this.atoms.size (); i++) {
this.atoms.get (i).finalizeAtom ();
}
this.sym = this.reader.getSymmetry ();
for (var i = 0; i < this.links.size (); i++) {
this.links.get (i).finalizeLink ();
}
if (this.reader.doApplySymmetry) {
this.reader.applySymmetryAndSetTrajectory ();
}return true;
});
Clazz.overrideMethod (c$, "finalizeSymmetry", 
function (haveSymmetry) {
if (this.reader == null || !haveSymmetry || this.links.size () == 0) return;
var bsConnected =  new JU.BS ();
var bsAtoms =  new JU.BS ();
var nLinks = this.processAssociations (bsConnected, bsAtoms);
var bsExclude = J.adapter.readers.cif.TopoCifParser.shiftBits (bsAtoms, bsConnected);
if (bsConnected.cardinality () > 0) {
this.reader.asc.bsAtoms = bsAtoms;
this.reader.asc.atomSetInfo.put ("bsExcludeBonding", bsExclude);
}this.reader.appendLoadNote ("TopoCifParser created " + bsConnected.cardinality () + " nodes and " + nLinks + " links");
var info =  new JU.Lst ();
for (var i = 0, n = this.links.size (); i < n; i++) {
info.addLast (this.links.get (i).getLinkInfo ());
}
this.reader.asc.setCurrentModelInfo ("topology", info);
var script = "if (autobond) {delete !connected && !(atomName LIKE '*_Link*' or atomName LIKE '*_Node*')}; display displayed or " + this.nets.get (0).label + "__*";
this.reader.addJmolScript (script);
for (var i = 0; i < this.nets.size (); i++) {
this.nets.get (i).finalizeNet ();
}
}, "~B");
c$.shiftBits = Clazz.defineMethod (c$, "shiftBits", 
function (bsAtoms, bs) {
var bsNew =  new JU.BS ();
for (var pt = 0, i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
while (bsAtoms.get (i)) {
bsNew.setBitTo (pt++, bs.get (i++));
}
}
return bsNew;
}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "processAssociations", 
 function (bsConnected, bsAtoms) {
var nlinks = 0;
var atoms = this.reader.asc.atoms;
for (var i = this.reader.asc.ac; --i >= this.ac0; ) {
var a = atoms[i];
var idx = a.sequenceNumber;
if (idx == -2147483648 || idx == 0) continue;
if (idx > 0) {
var node = this.getAssociatedNodeByIdx (idx - 1);
if (node.bsAtoms == null) node.bsAtoms =  new JU.BS ();
node.bsAtoms.set (this.i0 + a.index);
} else {
var link = this.getAssoiatedLinkByIdx (-idx - 1);
if (link != null) {
if (link.bsAtoms == null) link.bsAtoms =  new JU.BS ();
link.bsAtoms.set (this.i0 + a.index);
}}bsAtoms.set (a.index);
}
var checkDistance = this.reader.doPackUnitCell;
var bonds = this.reader.asc.bonds;
for (var i = this.reader.asc.bondCount; --i >= this.bc0; ) {
var b = bonds[i];
if (b.order >= 33554432) {
bonds[i] = null;
} else if (b.order >= 16777216) {
b.order -= 16777216;
var link = this.getAssoiatedLinkByIdx (b.order >> 4);
if (checkDistance && Math.abs (this.calculateDistance (atoms[b.atomIndex1], atoms[b.atomIndex2]) - link.distance) >= J.adapter.readers.cif.TopoCifParser.ERROR_TOLERANCE) {
bonds[i] = null;
continue;
}if (link.bsBonds == null) link.bsBonds =  new JU.BS ();
link.bsBonds.set (this.b0 + i);
switch (b.order & 0xF) {
default:
b.order = 1;
break;
case 2:
b.order = 2;
break;
case 3:
b.order = 3;
break;
case 4:
b.order = 4;
break;
case 5:
b.order = 5;
break;
case 6:
b.order = 6;
break;
case 10:
b.order = 1;
break;
case 11:
case 12:
b.order = 515;
break;
case 13:
b.order = 2048;
break;
case 14:
b.order = 33;
break;
}
bsConnected.set (b.atomIndex1);
bsConnected.set (b.atomIndex2);
nlinks++;
}}
bsAtoms.or (bsConnected);
for (var i = this.nodes.size (); --i >= 0; ) {
var node = this.nodes.get (i);
if (node.bsAtoms != null) {
node.bsAtoms = J.adapter.readers.cif.TopoCifParser.shiftBits (bsAtoms, node.bsAtoms);
}}
for (var i = this.links.size (); --i >= 0; ) {
var link = this.links.get (i);
if (link.bsAtoms != null) {
link.bsAtoms = J.adapter.readers.cif.TopoCifParser.shiftBits (bsAtoms, link.bsAtoms);
}}
return nlinks;
}, "JU.BS,JU.BS");
c$.isEqualD = Clazz.defineMethod (c$, "isEqualD", 
function (p1, p2, d) {
return (Double.isNaN (d) || Math.abs (p1.distance (p2) - d) < J.adapter.readers.cif.TopoCifParser.ERROR_TOLERANCE);
}, "JU.T3,JU.T3,~N");
Clazz.defineMethod (c$, "getDataValue", 
 function (key) {
var f = this.reader.getField (key);
return ("\0".equals (f) ? null : f);
}, "~N");
Clazz.defineMethod (c$, "getInt", 
 function (f) {
return (f == null ? -2147483648 : this.reader.parseIntStr (f));
}, "~S");
Clazz.defineMethod (c$, "getFloat", 
 function (f) {
return (f == null ? NaN : this.reader.parseFloatStr (f));
}, "~S");
c$.setTAtom = Clazz.defineMethod (c$, "setTAtom", 
function (a, b) {
b.setT (a);
b.formalCharge = a.formalCharge;
b.bondRadius = a.bondRadius;
}, "J.adapter.smarter.Atom,J.adapter.smarter.Atom");
c$.setElementSymbol = Clazz.defineMethod (c$, "setElementSymbol", 
function (a, formula) {
var name = a.atomName;
if (formula == null) {
a.atomName = (a.atomName == null ? "X" : a.atomName.substring (a.atomName.indexOf ('_') + 1));
} else {
a.atomName = formula;
}a.getElementSymbol ();
a.atomName = name;
}, "J.adapter.smarter.Atom,~S");
c$.applySymmetry = Clazz.defineMethod (c$, "applySymmetry", 
function (a, ops, op, t) {
if (op >= 0) {
if (op > 1 || t.x != 0 || t.y != 0 || t.z != 0) {
if (op > 1) ops[op].rotTrans (a);
a.add (t);
}}}, "J.adapter.smarter.Atom,~A,~N,JU.T3");
Clazz.defineMethod (c$, "getNetByID", 
function (id) {
for (var i = this.nets.size (); --i >= 0; ) {
var n = this.nets.get (i);
if (n.id == id) return n;
}
var n = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TNet, this, null, this.netCount++, id, "Net" + id, null);
this.nets.addLast (n);
return n;
}, "~N");
Clazz.defineMethod (c$, "getAtomFromName", 
function (atomLabel) {
return (atomLabel == null ? null : this.reader.asc.getAtomFromName (atomLabel));
}, "~S");
Clazz.defineMethod (c$, "calculateDistance", 
function (p1, p2) {
this.temp1.setT (p1);
this.temp2.setT (p2);
this.sym.toCartesian (this.temp1, true);
this.sym.toCartesian (this.temp2, true);
return this.temp1.distance (this.temp2);
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "getNetFor", 
function (id, label) {
var net = null;
if (id > 0) {
net = this.getNetByID (id);
} else if (label != null) {
for (var i = this.nets.size (); --i >= 0; ) {
var n = this.nets.get (i);
if (n.label.equals (label)) {
net = n;
break;
}}
}if (net == null) {
net = this.getNetByID (id < 1 ? 1 : id);
}if (label != null) net.label = label;
return net;
}, "~N,~S");
Clazz.defineMethod (c$, "getAssociatedNodeByIdx", 
function (idx) {
for (var i = this.nodes.size (); --i >= 0; ) {
var n = this.nodes.get (i);
if (n.idx == idx) return n;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "getAssoiatedLinkByIdx", 
function (idx) {
for (var i = this.links.size (); --i >= 0; ) {
var l = this.links.get (i);
if (l.idx == idx) return l;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "getNodeById", 
function (nodeID, op, trans) {
for (var i = this.nodes.size (); --i >= 0; ) {
var n = this.nodes.get (i);
if (n.id == nodeID && (op < 0 || n.linkSymop == op && n.linkTrans.equals (trans))) return n;
}
return null;
}, "~N,~N,JU.P3");
c$.$TopoCifParser$TNet$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.line = null;
this.id = 0;
this.nLinks = 0;
this.nNodes = 0;
this.label = null;
this.specialDetails = null;
this.idx = 0;
this.hasAtoms = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif.TopoCifParser, "TNet");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.idx = a;
this.id = b;
this.label = c;
this.specialDetails = d;
}, "~N,~N,~S,~S");
Clazz.defineMethod (c$, "finalizeNet", 
function () {
var a = "," + this.id + ",";
if (this.b$["J.adapter.readers.cif.TopoCifParser"].netNotes.indexOf (a) < 0) {
this.b$["J.adapter.readers.cif.TopoCifParser"].reader.appendLoadNote ("Net " + this.label + (this.specialDetails == null ? "" : " '" + this.specialDetails + "'") + " created with " + this.nLinks + " links and " + this.nNodes + " nodes.\n" + "Use DISPLAY " + (this.hasAtoms ? this.label + "__* to display it without associated atoms\nUse DISPLAY " + this.label + "_* to display it with its associated atoms" : this.label + "* to display it" + ""));
}});
c$ = Clazz.p0p ();
};
c$.$TopoCifParser$TAtom$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.id = 0;
this.atomLabel = null;
this.nodeID = 0;
this.linkID = 0;
this.symop = 0;
this.trans = null;
this.formula = null;
this.line = null;
this.isFinalized = false;
this.idx = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif.TopoCifParser, "TAtom", J.adapter.smarter.Atom);
Clazz.prepareFields (c$, function () {
this.trans =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.cif.TopoCifParser.TAtom);
var a = 0;
});
Clazz.defineMethod (c$, "getTClone", 
function () {
try {
var a = this.clone ();
a.idx = this.b$["J.adapter.readers.cif.TopoCifParser"].atomCount++;
return a;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "setAtom", 
function (a, b) {
this.line = b;
if (Float.isNaN (this.x) != Float.isNaN (this.y) || Float.isNaN (this.y) != Float.isNaN (this.z)) return false;
this.idx = this.b$["J.adapter.readers.cif.TopoCifParser"].atomCount++;
if (Float.isNaN (this.x)) {
this.trans = JU.P3.new3 (a[0], a[1], a[2]);
} else {
this.symop = 0;
}if (this.formula != null && this.formula.indexOf (" ") < 0) {
this.atomName = this.formula;
this.getElementSymbol ();
if (!this.formula.equals (this.elementSymbol)) this.elementSymbol = "Z";
}this.atomName = this.atomLabel;
return true;
}, "~A,~S");
Clazz.defineMethod (c$, "finalizeAtom", 
function () {
if (this.isFinalized) return;
this.isFinalized = true;
var a = this.b$["J.adapter.readers.cif.TopoCifParser"].getAtomFromName (this.atomLabel);
J.adapter.readers.cif.TopoCifParser.setElementSymbol (this, this.formula);
if (a == null && Float.isNaN (this.x)) {
throw  new Exception ("TopoCIFParser.finalizeAtom no atom " + this.atomLabel + " line=" + this.line);
}var b = null;
if (this.nodeID > 0) {
b = this.b$["J.adapter.readers.cif.TopoCifParser"].getNodeById (this.nodeID, -1, null);
if (b != null) {
b.addAtom (this);
}}var c = null;
if (this.linkID > 0) {
c = this.getLinkById (this.linkID);
if (c != null) c.addAtom (this);
}if (b == null && c == null) {
System.out.println ("TAtom " + this + " ignored");
return;
}if (a != null && Float.isNaN (this.x)) {
J.adapter.readers.cif.TopoCifParser.setTAtom (a, this);
J.adapter.readers.cif.TopoCifParser.applySymmetry (this, this.b$["J.adapter.readers.cif.TopoCifParser"].ops, this.symop, this.trans);
}this.atomName = (b != null ? "Node_" + this.nodeID + "_" : c != null ? "Link_" + this.linkID + "_" : "TAtom_") + this.atomLabel;
System.out.println ("TAtom adding " + this);
this.b$["J.adapter.readers.cif.TopoCifParser"].reader.addCifAtom (this, this.atomName, null, null);
});
Clazz.defineMethod (c$, "getLinkById", 
 function (a) {
for (var b = this.b$["J.adapter.readers.cif.TopoCifParser"].links.size (); --b >= 0; ) {
var c = this.b$["J.adapter.readers.cif.TopoCifParser"].links.get (b);
if (c.id == a) return c;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "toString", 
function () {
return this.line + " " + Clazz.superCall (this, J.adapter.readers.cif.TopoCifParser.TAtom, "toString", []);
});
c$ = Clazz.p0p ();
};
c$.$TopoCifParser$TNode$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.id = 0;
this.formula = null;
this.atomLabel = null;
this.netID = 0;
this.label = null;
this.symop = 0;
this.trans = null;
this.tatoms = null;
this.bsAtoms = null;
this.linkSymop = 0;
this.linkTrans = null;
this.net = null;
this.isFinalized = false;
this.idx = 0;
this.atom = null;
this.line = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif.TopoCifParser, "TNode", J.adapter.smarter.Atom);
Clazz.prepareFields (c$, function () {
this.trans =  new JU.P3 ();
this.linkTrans =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.cif.TopoCifParser.TNode);
var a = 0;
});
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
Clazz.superConstructor (this, J.adapter.readers.cif.TopoCifParser.TNode);
this.idx = a;
this.atom = b;
this.net = c;
this.linkSymop = d;
this.linkTrans = e;
this.label = this.atomName = this.atomLabel = b.atomName;
this.formula = b.getElementSymbol ();
J.adapter.readers.cif.TopoCifParser.setTAtom (b, this);
}, "~N,J.adapter.smarter.Atom,J.adapter.readers.cif.TopoCifParser.TNet,~N,JU.P3");
Clazz.defineMethod (c$, "setNode", 
function (a, b) {
this.line = b;
if (this.tatoms == null) {
if (Float.isNaN (this.x) != Float.isNaN (this.y) || Float.isNaN (this.y) != Float.isNaN (this.z)) return false;
this.idx = this.b$["J.adapter.readers.cif.TopoCifParser"].atomCount++;
if (Float.isNaN (this.x)) {
this.trans = JU.P3.new3 (a[0], a[1], a[2]);
} else {
this.symop = 0;
}if (this.formula != null && this.formula.indexOf (" ") < 0) {
this.atomName = this.formula;
this.getElementSymbol ();
if (!this.formula.equals (this.elementSymbol)) this.elementSymbol = "Z";
this.atomName = null;
}}if (this.net == null) this.net = this.b$["J.adapter.readers.cif.TopoCifParser"].getNetFor (this.netID, null);
this.netID = this.net.id;
return true;
}, "~A,~S");
Clazz.defineMethod (c$, "addAtom", 
function (a) {
if (this.tatoms == null) this.tatoms =  new JU.Lst ();
this.tatoms.addLast (a);
}, "J.adapter.readers.cif.TopoCifParser.TAtom");
Clazz.defineMethod (c$, "finalizeNode", 
function (a) {
if (this.isFinalized) return;
this.isFinalized = true;
var b = !Float.isNaN (this.x);
var c;
if (this.tatoms == null) {
c = (this.atom == null ? this.b$["J.adapter.readers.cif.TopoCifParser"].getAtomFromName (this.atomLabel) : this.atom);
J.adapter.readers.cif.TopoCifParser.setElementSymbol (this, this.formula == null ? c.elementSymbol : this.formula);
if (c == null && !b) {
throw  new Exception ("TopoCIFParser.finalizeNode no atom " + this.atomLabel + " line=" + this.line);
}} else {
this.setCentroid ();
if (this.tatoms.size () == 1) {
var d = this.tatoms.get (0);
J.adapter.readers.cif.TopoCifParser.setElementSymbol (d, d.elementSymbol);
this.atomLabel = d.atomLabel;
this.formalCharge = d.formalCharge;
this.tatoms = null;
} else {
this.net.hasAtoms = true;
this.elementSymbol = "Xx";
for (var d = this.tatoms.size (); --d >= 0; ) {
var e = this.tatoms.get (d);
e.sequenceNumber = this.idx + 1;
if (e.atomName == null || !e.atomName.startsWith (this.net.label + "_")) e.atomName = this.net.label + "_" + e.atomName;
}
}c = this;
}if ((c != null && c === this.atom) || !b) {
if (c !== this) {
J.adapter.readers.cif.TopoCifParser.setTAtom (c, this);
}J.adapter.readers.cif.TopoCifParser.applySymmetry (this, a, this.symop, this.trans);
}this.atomName = this.net.label + "__";
if (this.label != null && this.label.startsWith (this.atomName)) {
this.atomName = "";
}this.atomName += (this.label != null ? this.label : this.atomLabel != null ? this.atomLabel : "Node_" + this.id);
this.addNode ();
}, "~A");
Clazz.defineMethod (c$, "addNode", 
 function () {
this.b$["J.adapter.readers.cif.TopoCifParser"].reader.addCifAtom (this, this.atomName, null, null);
this.net.nNodes++;
});
Clazz.defineMethod (c$, "setCentroid", 
 function () {
this.x = this.y = this.z = 0;
var a = this.tatoms.size ();
for (var b = a; --b >= 0; ) this.add (this.tatoms.get (b));

this.x /= a;
this.y /= a;
this.z /= a;
});
Clazz.defineMethod (c$, "info", 
function () {
return "[node " + this.id + " " + this.label + "/" + this.atomName + " " + Clazz.superCall (this, J.adapter.readers.cif.TopoCifParser.TNode, "toString", []) + "]";
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.info ();
});
Clazz.defineMethod (c$, "copy", 
function () {
var a = this.clone ();
a.idx = this.b$["J.adapter.readers.cif.TopoCifParser"].atomCount++;
if (a.isFinalized) a.addNode ();
if (this.tatoms != null) {
a.tatoms =  new JU.Lst ();
for (var b = 0, c = this.tatoms.size (); b < c; b++) {
var d = this.tatoms.get (b).getTClone ();
a.tatoms.addLast (d);
this.b$["J.adapter.readers.cif.TopoCifParser"].reader.addCifAtom (d, d.atomName, null, null);
}
}return a;
});
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, J.adapter.readers.cif.TopoCifParser.TNode, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});
c$ = Clazz.p0p ();
};
c$.$TopoCifParser$TLink$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.id = 0;
this.nodeIds = null;
this.atomLabels = null;
this.symops = null;
this.translations = null;
this.netID = 0;
this.netLabel = null;
this.type = "";
this.multiplicity = 0;
this.topoOrder = 0;
this.voronoiAngle = 0;
this.cartesianDistance = 0;
this.idx = 0;
this.net = null;
this.linkNodes = null;
this.typeBondOrder = 0;
this.tatoms = null;
this.bsAtoms = null;
this.bsBonds = null;
this.line = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif.TopoCifParser, "TLink", J.adapter.smarter.Bond);
Clazz.prepareFields (c$, function () {
this.nodeIds =  Clazz.newIntArray (2, 0);
this.atomLabels =  new Array (2);
this.symops =  Clazz.newIntArray (2, 0);
this.translations =  new Array (2);
this.linkNodes =  new Array (2);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.cif.TopoCifParser.TLink);
var a = 0;
});
Clazz.defineMethod (c$, "setLink", 
function (a, b, c) {
this.line = c;
this.idx = this.b$["J.adapter.readers.cif.TopoCifParser"].linkCount++;
if (this.nodeIds[1] == 0) this.nodeIds[1] = this.nodeIds[0];
this.typeBondOrder = J.adapter.readers.cif.TopoCifParser.getBondType (this.type, this.topoOrder);
this.translations[0] = JU.P3.new3 (a[0], a[1], a[2]);
this.translations[1] = JU.P3.new3 (b[0], b[1], b[2]);
System.out.println ("TopoCifParser.setLink " + this);
return true;
}, "~A,~A,~S");
Clazz.defineMethod (c$, "addAtom", 
function (a) {
if (this.tatoms == null) this.tatoms =  new JU.Lst ();
this.tatoms.addLast (a);
}, "J.adapter.readers.cif.TopoCifParser.TAtom");
Clazz.defineMethod (c$, "finalizeLink", 
function () {
this.finalizeLinkNode (0);
this.finalizeLinkNode (1);
if (this.tatoms != null) {
this.net.hasAtoms = true;
for (var a = this.tatoms.size (); --a >= 0; ) {
var b = this.tatoms.get (a);
b.sequenceNumber = -this.idx - 1;
b.atomName = this.net.label + "_" + b.atomName;
}
}this.order = 16777216 + (this.idx << 4) + this.typeBondOrder;
this.distance = this.b$["J.adapter.readers.cif.TopoCifParser"].calculateDistance (this.linkNodes[0], this.linkNodes[1]);
if (this.cartesianDistance != 0 && Math.abs (this.distance - this.cartesianDistance) >= J.adapter.readers.cif.TopoCifParser.ERROR_TOLERANCE) System.err.println ("Distance error! distance=" + this.distance + " for " + this.line);
System.out.println ("link d=" + this.distance + " " + this + this.linkNodes[0] + this.linkNodes[1]);
this.b$["J.adapter.readers.cif.TopoCifParser"].reader.asc.addBond (this);
});
Clazz.defineMethod (c$, "finalizeLinkNode", 
 function (a) {
var b = this.nodeIds[a];
var c = this.atomLabels[a];
var d = this.symops[a];
var e = this.translations[a];
var f = this.getNodeWithSym (b, c, d, e);
var g = f;
if (f == null) {
f = this.getNodeWithSym (b, c, -1, null);
}var h = (f == null ? this.b$["J.adapter.readers.cif.TopoCifParser"].getAtomFromName (c) : null);
if (h != null) {
this.setNet (null);
f = Clazz.innerTypeInstance (J.adapter.readers.cif.TopoCifParser.TNode, this, null, this.b$["J.adapter.readers.cif.TopoCifParser"].atomCount++, h, this.net, d, e);
} else if (f != null) {
this.setNet (f);
if (g == null) f = f.copy ();
f.linkSymop = d;
f.linkTrans = e;
} else {
throw  new Exception ("TopoCIFParser.addNodeIfNull no atom or node " + c + " line=" + this.line);
}this.b$["J.adapter.readers.cif.TopoCifParser"].nodes.addLast (f);
this.linkNodes[a] = f;
if (a == 1 && f === this.linkNodes[0]) {
this.linkNodes[1] = f.copy ();
}f.finalizeNode (this.b$["J.adapter.readers.cif.TopoCifParser"].ops);
J.adapter.readers.cif.TopoCifParser.applySymmetry (f, this.b$["J.adapter.readers.cif.TopoCifParser"].ops, d, e);
if (a == 0) this.atomIndex1 = f.index;
 else this.atomIndex2 = f.index;
}, "~N");
Clazz.defineMethod (c$, "setNet", 
 function (a) {
if (this.net != null) return;
this.net = (a == null ? this.b$["J.adapter.readers.cif.TopoCifParser"].getNetFor (this.netID, this.netLabel) : a.net);
this.net.nLinks++;
this.netLabel = this.net.label;
this.netID = this.net.id;
}, "J.adapter.readers.cif.TopoCifParser.TNode");
Clazz.defineMethod (c$, "getNodeWithSym", 
 function (a, b, c, d) {
if (a > 0) return this.b$["J.adapter.readers.cif.TopoCifParser"].getNodeById (a, c, d);
for (var e = this.b$["J.adapter.readers.cif.TopoCifParser"].nodes.size (); --e >= 0; ) {
var f = this.b$["J.adapter.readers.cif.TopoCifParser"].nodes.get (e);
if (f.label.equals (b) && (c == -1 || c == f.linkSymop && d.equals (f.linkTrans))) return f;
}
return null;
}, "~N,~S,~N,JU.P3");
Clazz.defineMethod (c$, "getLinkInfo", 
function () {
var a =  new java.util.Hashtable ();
a.put ("index", Integer.$valueOf (this.idx + 1));
if (this.id > 0) a.put ("id", Integer.$valueOf (this.id));
a.put ("netID", Integer.$valueOf (this.netID));
a.put ("netLabel", this.netLabel);
if (this.atomLabels[0] != null) a.put ("atomLabel1", this.atomLabels[0]);
if (this.atomLabels[1] != null) a.put ("atomLabel2", this.atomLabels[1]);
if (this.nodeIds[0] > 0) a.put ("nodeId1", Integer.$valueOf (this.nodeIds[0]));
if (this.nodeIds[1] > 0) a.put ("nodeId2", Integer.$valueOf (this.nodeIds[1]));
a.put ("distance", Float.$valueOf (this.cartesianDistance));
if (!Float.isNaN (this.distance)) a.put ("distance", Float.$valueOf (this.distance));
a.put ("symops1", Integer.$valueOf (this.symops[0] + 1));
a.put ("symops2", Integer.$valueOf (this.symops[1] + 1));
a.put ("translation1", this.translations[0]);
a.put ("translation2", this.translations[1]);
a.put ("multiplicity", Integer.$valueOf (this.multiplicity));
if (this.type != null) a.put ("type", this.type);
a.put ("voronoiSolidAngle", Float.$valueOf (this.voronoiAngle));
a.put ("atomIndex1", Integer.$valueOf (this.b$["J.adapter.readers.cif.TopoCifParser"].i0 + this.linkNodes[0].index));
a.put ("atomIndex2", Integer.$valueOf (this.b$["J.adapter.readers.cif.TopoCifParser"].i0 + this.linkNodes[1].index));
if (this.bsAtoms != null && this.bsAtoms.cardinality () > 0) a.put ("representedAtoms", this.bsAtoms);
a.put ("topoOrder", Integer.$valueOf (this.topoOrder));
a.put ("order", Integer.$valueOf (this.typeBondOrder));
return a;
});
Clazz.defineMethod (c$, "info", 
function () {
return "[link " + this.line + " : " + this.distance + "]";
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.info ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"TOPOL_LINK", 0x1000000,
"TOPOL_GROUP", 0x2000000,
"TOPOL_NODE", 0x4000000,
"LINK_TYPE_SINGLE", 1,
"LINK_TYPE_DOUBLE", 2,
"LINK_TYPE_TRIPLE", 3,
"LINK_TYPE_QUADRUPLE", 4,
"LINK_TYPE_QUINTUPLE", 5,
"LINK_TYPE_SEXTUPLE", 6,
"LINK_TYPE_SEPTUPLE", 7,
"LINK_TYPE_OCTUPLE", 8,
"LINK_TYPE_AROM", 9,
"LINK_TYPE_POLY", 0xA,
"LINK_TYPE_DELO", 0xB,
"LINK_TYPE_PI", 0xC,
"LINK_TYPE_HBOND", 0xD,
"LINK_TYPE_VDW", 0xE,
"LINK_TYPE_OTHER", 0xF,
"linkTypes", "?  SINTRIQUAQUISEXSEPOCTAROPOLPI HBOVDW",
"LINK_TYPE_BITS", 4,
"ERROR_TOLERANCE", 0.001,
"topolFields",  Clazz.newArray (-1, ["_topol_net_id", "_topol_net_label", "_topol_net_special_details", "_topol_link_id", "_topol_link_net_id", "_topol_link_node_id_1", "_topol_link_node_id_2", "_topol_link_node_label_1", "_topol_link_node_label_2", "_topol_link_atom_label_1", "_topol_link_atom_label_2", "_topol_link_symop_1", "_topol_link_translation_1", "_topol_link_translation_1_x", "_topol_link_translation_1_y", "_topol_link_translation_1_z", "_topol_link_symop_2", "_topol_link_translation_2", "_topol_link_translation_2_x", "_topol_link_translation_2_y", "_topol_link_translation_2_z", "_topol_link_distance", "_topol_link_type", "_topol_link_multiplicity", "_topol_link_voronoi_solidangle", "_topol_link_order", "_topol_node_id", "_topol_node_net_id", "_topol_node_label", "_topol_node_atom_label", "_topol_node_symop", "_topol_node_translation", "_topol_node_translation_x", "_topol_node_translation_y", "_topol_node_translation_z", "_topol_node_fract_x", "_topol_node_fract_y", "_topol_node_fract_z", "_topol_node_chemical_formula_sum", "_topol_atom_id", "_topol_atom_atom_label", "_topol_atom_node_id", "_topol_atom_link_id", "_topol_atom_symop", "_topol_atom_translation", "_topol_atom_translation_x", "_topol_atom_translation_y", "_topol_atom_translation_z", "_topol_atom_fract_x", "_topol_atom_fract_y", "_topol_atom_fract_z", "_topol_atom_element_symbol", "_topol_link_site_symmetry_symop_1", "_topol_link_site_symmetry_translation_1_x", "_topol_link_site_symmetry_translation_1_y", "_topol_link_site_symmetry_translation_1_z", "_topol_link_site_symmetry_symop_2", "_topol_link_site_symmetry_translation_2_x", "_topol_link_site_symmetry_translation_2_y", "_topol_link_site_symmetry_translation_2_z", "_topol_link_site_symmetry_translation_1", "_topol_link_site_symmetry_translation_2"]),
"topol_net_id", 0,
"topol_net_label", 1,
"topol_net_special_details", 2,
"topol_link_id", 3,
"topol_link_net_id", 4,
"topol_link_node_id_1", 5,
"topol_link_node_id_2", 6,
"topol_link_node_label_1", 7,
"topol_link_node_label_2", 8,
"topol_link_atom_label_1", 9,
"topol_link_atom_label_2", 10,
"topol_link_symop_1", 11,
"topol_link_translation_1", 12,
"topol_link_translation_1_x", 13,
"topol_link_translation_1_y", 14,
"topol_link_translation_1_z", 15,
"topol_link_symop_2", 16,
"topol_link_translation_2", 17,
"topol_link_translation_2_x", 18,
"topol_link_translation_2_y", 19,
"topol_link_translation_2_z", 20,
"topol_link_distance", 21,
"topol_link_type", 22,
"topol_link_multiplicity", 23,
"topol_link_voronoi_solidangle", 24,
"topol_link_order", 25,
"topol_node_id", 26,
"topol_node_net_id", 27,
"topol_node_label", 28,
"topol_node_atom_label", 29,
"topol_node_symop", 30,
"topol_node_translation", 31,
"topol_node_translation_x", 32,
"topol_node_translation_y", 33,
"topol_node_translation_z", 34,
"topol_node_fract_x", 35,
"topol_node_fract_y", 36,
"topol_node_fract_z", 37,
"topol_node_chemical_formula_sum", 38,
"topol_atom_id", 39,
"topol_atom_atom_label", 40,
"topol_atom_node_id", 41,
"topol_atom_link_id", 42,
"topol_atom_symop", 43,
"topol_atom_translation", 44,
"topol_atom_translation_x", 45,
"topol_atom_translation_y", 46,
"topol_atom_translation_z", 47,
"topol_atom_fract_x", 48,
"topol_atom_fract_y", 49,
"topol_atom_fract_z", 50,
"topol_atom_element_symbol", 51,
"topol_link_site_symmetry_symop_1", 52,
"topol_link_site_symmetry_translation_1_x", 53,
"topol_link_site_symmetry_translation_1_y", 54,
"topol_link_site_symmetry_translation_1_z", 55,
"topol_link_site_symmetry_symop_2", 56,
"topol_link_site_symmetry_translation_2_x", 57,
"topol_link_site_symmetry_translation_2_y", 58,
"topol_link_site_symmetry_translation_2_z", 59,
"topol_link_site_symmetry_translation_1", 60,
"topol_link_site_symmetry_translation_2", 61);
});

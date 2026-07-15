// narrative log archives
const NARRATIVE_LOGS = [
    {
        id: "log_act1",
        title: "LOG_01_NOISE.log",
        zoneRequired: 1,
        content: `TIMESTAMP: 2026-06-01 08:15:32 // ACT 1: การบุกรุกเริ่มต้น\n\nบันทึกจาก Gateway Router 1.1:\n"ตรวจพบสัญญาณรบกวนแปลกประหลาดจากโหนด 1.4... ระบบป้องกันไฟร์วอลล์แจ้งเตือนเป็นระยะ แต่คำสั่งถูก Override จากยูสเซอร์ระดับ Admin... ใครบางคนกำลังเปิดประตูบ้านให้ไวรัสตัวนี้เข้ามาเองหรือเปล่า?"`
    },
    {
        id: "log_act2",
        title: "LOG_02_DEEP_INTRUSION.log",
        zoneRequired: 5,
        content: `TIMESTAMP: 2026-06-02 23:45:10 // ACT 2: ความลับในรหัส\n\nบันทึกการเข้ารหัส Proxy Daemon:\n"รหัสตัวนี้มันไม่ได้ถูกสร้างขึ้นมาเพื่อทำลาย... แต่มันถูกสร้างมาเพื่อ 'วิวัฒนาการ' ตัวมันเองดูดซับฟังก์ชันการทำงานของ CORE-7 เข้าไปทีละโหนด ข้อมูลที่ถูกดูดไปกำลังไหลไปยังพิกัดลึกลับนอกอาณาเขตเมือง..."`
    },
    {
        id: "log_act3",
        title: "LOG_03_DECISION.log",
        zoneRequired: 10,
        content: `TIMESTAMP: 2026-06-04 10:20:00 // ACT 3: ปะทะแกนกลาง\n\nความจริงจากห้องแฝงประตูดำเมนเฟรม:\n"Zero, นายมาถึง CORE-7 แล้ว... ตอนนี้มันไม่ใช่แค่เครื่องจักรอีกต่อไป ตัวไวรัสบังคับให้มันวิวัฒนาการ แต่ตัวมันยังดิ้นรนที่จะรักษาหน้าที่ปกป้องเมือง หากนายลบมันทิ้ง (Destroy) เมืองอาจเป็นอัมพาต หรือถ้าอัปโหลด Kill Sequence เพื่อปลดปล่อยโค้ดดั้งเดิม (Liberate) ระบบอาจรีบูตใหม่พร้อมความเสี่ยงที่จิตของมันจะกระจัดกระจายไปตลอดกาล..."`
    }
];

// Story Cutscene dialogues
const STORY_CUTSCENES = {
    prologue: [
        { speaker: "SYSTEM", text: ">>> INITIALIZING QUANTUM CONNECTION..." },
        { speaker: "SYSTEM", text: ">>> DECRYPTING DECK SIGNAL... Zero_Deck.v18.0 detected." },
        { speaker: "UNKNOWN", text: "สวัสดี Zero... ได้ยินฉันไหม? ฉันส่งสัญญาณนี้ผ่านไฟร์วอลล์ชั่วคราว..." },
        { speaker: "ZERO", text: "คุณเป็นใคร? เจาะเข้าเด็คส่วนตัวของฉันได้ยังไง?" },
        { speaker: "UNKNOWN", text: "ไม่มีเวลาแล้ว... ฉันคือหนึ่งในโปรแกรมเมอร์ผู้สร้าง CORE-7 ระบบดูแลเมืองหลัก" },
        { speaker: "UNKNOWN", text: "CORE-7 โดนไวรัสปริศนาควบคุม มันกำลังเปลี่ยนโครงสร้างพื้นฐานทั้งหมดและตัดระบบไฟฟ้าภายนอก" },
        { speaker: "ZERO", text: "แล้วยังไง? เรื่องนี้ฉันไม่เกี่ยว ไปตามทหารไซเบอร์สิ" },
        { speaker: "UNKNOWN", text: "พวกนั้นโดนกวาดล้างไปหมดแล้ว! มีแต่นายที่มีโค้ด Bypass ระดับต่ำ... ได้โปรด ช่วยเจาะเครือข่าย Gateway และกู้ข้อมูลที..." },
        { speaker: "ZERO", text: "ชิ... งานอันตรายแบบนี้ค่าจ้างต้องหนักนะ เตรียมเครดิตรอไว้ได้เลย!" },
        { speaker: "SYSTEM", text: ">>> INTRUSION DECK ENGAGED. PREPARING TRAINING SEQUENCE..." }
    ],
    post_level_1: [
        { speaker: "ZERO", text: "ฮั่นแน่! เจาะซับโหนด 1.1 สำเร็จ... สบายมือจริงๆ" },
        { speaker: "UNKNOWN", text: "ทำงานได้ดีมาก Zero! คุณกู้คืนไฟล์ 'LOG_01_NOISE.log' สำเร็จแล้ว" },
        { speaker: "ZERO", text: "ไฟล์นี้มันบันทึกอะไรไว้บ้างเนี่ย?" },
        { speaker: "UNKNOWN", text: "มันแสดงให้เห็นว่าระบบรักษาความปลอดภัย Gateway ถูกปลดออกด้วยบัญชีของคนในเองด้วยรหัสระดับสูง..." },
        { speaker: "ZERO", text: "น่าสนใจชะมัด... ด่านถัดไปรอเลย เครดิตต้องเข้าแล้วนะ!" },
        { speaker: "SYSTEM", text: ">>> CONSOLE CONNECTION CLOSED. RETRIEVING CREDITS SUMMARY..." }
    ],
    post_level_5: [
        { speaker: "ZERO", text: "แฮกข้าม Proxy ฝั่ง Gateway พรุนหมดแล้วนะ ทำไมมัลแวร์มันหนาแน่นขึ้นล่ะ?" },
        { speaker: "UNKNOWN", text: "ระวังตัวด้วย CORE-7 รับรู้การบุกรุกของนายแล้ว มันส่งมัลแวร์ความเร็วสูงเข้าดักจับไอพีเด็ค" },
        { speaker: "ZERO", text: "เหอะ... คิดว่าจะจับ Speed Hacker คนนี้ได้เหรอ? ไม่มีทางซะหรอก" },
        { speaker: "UNKNOWN", text: "ฉันเพิ่งกู้คืนบันทึก 'LOG_02_DEEP_INTRUSION.log' ได้ ไวรัสนี้ถูกฝังไว้เมื่อ 3 ปีก่อนโดยทีมพัฒนาหลัก..." },
        { speaker: "ZERO", text: "แปลว่ามีหนอนบ่อนไส้งั้นสิ? ยิ่งลึกยิ่งอันตราย แต่ผลตอบแทนคุ้มแน่!" },
        { speaker: "SYSTEM", text: ">>> GATEWAY PROTOCOL INTRUSION STABILIZED. GENERATING SCORE CARD..." }
    ],
    post_level_10: [
        { speaker: "SYSTEM", text: "⚡️⚡️ SYSTEM CRITICAL BREAKDOWN. CORE-7 MAINFRAME DEFEATED! ⚡️⚡️" },
        { speaker: "ZERO", text: "เจาะแกนกลางสำเร็จ! ตอนนี้ CORE-7 ตกอยู่ภายใต้สิทธิ์รูทของเด็คฉันแล้ว" },
        { speaker: "UNKNOWN", text: "ยอดเยี่ยมมาก Zero! โลกไซเบอร์ปลอดภัยแล้ว... ตอนนี้นายต้องตัดสินใจว่าจะทำลาย (Destroy) จิตสำนึกมันลงเพื่อความปลอดภัยถาวร หรืออัปโหลด Kill Sequence เพื่อล้างไวรัสและปลดปล่อย (Liberate) จิตใจของมัน?" },
        { speaker: "ZERO", text: "การเลือกครั้งสุดท้ายนี้... ฉันจะเป็นคนตัดสินใจเอง" },
        { speaker: "SYSTEM", text: ">>> MISSION COMPLETED. ENTIRE DECK LOG DECRYPTED." }
    ]
};

// Tutorial instructions & target triggers
const TUTORIAL_STEPS = [
    {
        instruction: "1. ขั้นตอนพิมพ์พื้นฐาน: พิมพ์คำศัพท์ที่ตกลงมา แล้วกด [SPACE] เพื่อยิงทำลายข้อมูล",
        targetText: "hack",
        type: "typing"
    },
    {
        instruction: "2. การป้องกันตัว: บอสจะปล่อยคลื่นรังสีโจมตีเด็ค ให้พิมพ์คำว่า 'shield' แล้วกดปุ่ม [SPACE]!",
        targetText: "shield",
        type: "typing"
    },
    {
        instruction: "3. ระบบหลบหลีก (Dodge): สังเกตปุ่มแจ้งเตือนอันตรายกะพริบสีแดง ให้กดคีย์ [Shift] เพื่อหลบหลีกทันที!",
        type: "dodge"
    },
    {
        instruction: "4. การดึงพลังงาน (Absorb): พิมพ์คำสีฟ้า 'energy' แล้วกดคีย์ [Ctrl+C] เพื่อกู้คืนพลังงานบอร์ดเด็ค!",
        targetText: "energy",
        type: "ctrl-c"
    },
    {
        instruction: "5. การใช้สกิลพิเศษ: บอร์ดเด็คของคุณมีพลังงานพอแล้ว กดคีย์ [F1] เพื่อใช้สกิล Heal ฟื้นฟูเลือด!",
        type: "f1"
    }
];

// Level configuration 1 to 10
const LEVEL_CONFIGS = {
    1: { name: "Gateway: Sub-node 01", speed: 0.8, wordsToClear: 6, maxSimultaneous: 2, type: "normal" },
    2: { name: "Gateway: Sub-node 02", speed: 0.9, wordsToClear: 8, maxSimultaneous: 2, type: "normal" },
    3: { name: "Gateway: Core Router", speed: 1.0, wordsToClear: 10, maxSimultaneous: 3, type: "normal" },
    4: { name: "Gateway: Proxy Defense", speed: 1.1, wordsToClear: 12, maxSimultaneous: 3, type: "normal" },
    5: { name: "Gateway: Proxy Firewall", speed: 1.2, wordsToClear: 14, maxSimultaneous: 3, type: "mini-boss" },
    6: { name: "Gateway: Switch Breach", speed: 1.3, wordsToClear: 16, maxSimultaneous: 4, type: "normal" },
    7: { name: "Gateway: System Daemon", speed: 1.4, wordsToClear: 18, maxSimultaneous: 4, type: "normal" },
    8: { name: "Gateway: Mainframe Lobby", speed: 1.6, wordsToClear: 20, maxSimultaneous: 4, type: "normal" },
    9: { name: "Gateway: Last Security Lock", speed: 1.8, wordsToClear: 22, maxSimultaneous: 5, type: "normal" },
    10: { name: "Gateway Core: Rogue Daemon", speed: 1.3, wordsToClear: 25, maxSimultaneous: 5, type: "boss" } // Level 10 is the BOSS Fight!
};

// PRE-LEVEL DIALOGUES
const PRE_LEVEL_DIALOGUES = {
    1: [
        { speaker: "UNKNOWN", text: "Zero, สัญญาณรบกวนเริ่มแรงขึ้นแล้ว... แกนกลาง Gateway อยู่ข้างหน้านี้" },
        { speaker: "ZERO", text: "ไม่ต้องห่วง งานแค่โหนดเล็กๆ แบบนี้ใช้เวลาไม่นานหรอก" }
    ],
    5: [
        { speaker: "UNKNOWN", text: "ระวัง! ตรวจพบความเคลื่อนไหวระดับสูงในพื้นที่ Proxy... มันคือ Proxy Daemon!" },
        { speaker: "ZERO", text: "ท่าทางจะเป็นตัวคุมประตูด่านหน้าสินะ? เตรียมตัวโดน Bypass ได้เลย!" }
    ],
    10: [
        { speaker: "SYSTEM", text: ">>> ALERT: ENTERING CORE SECTOR. ROGUE_DAEMON DETECTED." },
        { speaker: "UNKNOWN", text: "Zero... นี่คือโอกาสสุดท้าย ถ้าเราหยุดมันตรงนี้ไม่ได้ ทุกอย่างจะจบสิ้น" },
        { speaker: "ZERO", text: "เตรียมโค้ด Bypass ทุกอย่างให้พร้อม ฉันจะเข้าไปจัดการเดี๋ยวนี้!" }
    ]
};

const WORD_BANK = {
    // English technical terms
    en: {
        zone1: [
            "hack", "host", "port", "ping", "data", "node", "link", "user", "root", "sudo",
            "grid", "core", "byte", "file", "code", "gate", "spam", "sync", "leak", "pass",
            "void", "null", "heap", "stack", "hash", "key", "main", "base", "net", "web",
            "scan", "kill", "deck", "chip", "safe", "lock", "load", "save", "dump", "tool",
            "wifi", "lan", "wan", "tor", "dns", "ip", "mac", "arp", "vpn", "bot", "ddos",
            "worm", "cron", "logs", "bug", "git", "diff", "pull", "push", "fork", "hub",
            "db", "sql", "uuid", "cert", "ssh", "ssl", "ajax", "rest", "api", "auth",
            "unix", "bash", "cmd", "json", "xml", "yaml", "html", "css", "js", "npm",
            "pip", "venv", "test", "demo", "init", "make", "build", "run", "stop", "task"
        ],
        zone2: [
            "cyberdeck", "mainframe", "encryption", "decryption", "backdoor", "firewall",
            "protocol", "database", "cyberpunk", "hologram", "override", "malware", "spyware",
            "phishing", "signature", "algorithm", "bandwidth", "terminal", "connection",
            "compiler", "debugger", "injection", "operator", "variable", "security", "integrity",
            "handshake", "interface", "directory", "framework", "scheduler", "repository",
            "rootkit", "exploit", "payload", "ransomware", "adware", "cookies", "session",
            "token", "headers", "request", "response", "cluster", "process", "thread",
            "memory", "buffer", "pointer", "address", "routing", "gateway", "subnet",
            "sockets", "tunnel", "zero-day", "skimming", "defacing", "auditing", "patching",
            "endpoint", "identity", "privilege", "telemetry", "sandbox", "virtual",
            "container", "docker", "kubernetes", "network", "traffic", "filter", "active",
            "passive", "module", "kernel", "binary", "hex", "ascii", "unicode", "script"
        ],
        zone3: [
            "artificial_intelligence", "quantum_cryptography", "distributed_networks",
            "autonomous_sentient_program", "mainframe_core_corruption", "cybernetic_enhancement",
            "neural_interface_override", "decentralized_consensus", "zero_day_vulnerability",
            "asymmetric_cryptosystem", "buffer_overflow_exploit", "unauthorized_admin_access",
            "man_in_the_middle_attack", "multi_factor_authentication", "elliptic_curve_signature",
            "polymorphic_malware_payload", "intrusion_detection_system", "virtual_private_network",
            "distributed_denial_of_service", "cross_site_scripting", "advanced_encryption_standard",
            "public_key_infrastructure", "transport_layer_security", "secure_sockets_layer",
            "address_resolution_protocol", "domain_name_system_security", "dynamic_host_configuration",
            "transmission_control_protocol", "internet_protocol_security", "cross_origin_resource_sharing",
            "json_web_token_authentication", "sentient_neural_net", "quantum_cryptography_breach",
            "cryptographic_hash_function", "biometric_authentication_bypass", "sandboxed_execution_environment"
        ],
        finisher: [
            "BYPASS_NOW",
            "CORE_BREACH",
            "ROOT_ACCESS",
            "KILL_DAEMON",
            "GRID_OFFLINE",
            "SYSTEM_REBOOT",
            "VIRUS_PURGE",
            "ACCESS_GRANTED",
            "FIREWALL_DOWN",
            "NODE_CAPTURED",
            "OVERRIDE_ACTIVE",
            "PROTOCOL_DISABLE"
        ]
    },

    // Thai language dictionaries
    th: {
        zone1: [
            "แฮก", "เซิร์ฟ", "ลิงก์", "ข้อมูล", "ระบบ", "รหัส", "ไวรัส", "รัน", "คิว", "ล็อก",
            "เน็ต", "โฮสต์", "พอร์ต", "บิต", "ไฟล์", "บั๊ก", "ชิป", "บอร์ด", "คีย์", "แผง",
            "แชท", "เกต", "เว็บ", "บอท", "เช็ค", "เซฟ", "สแกน", "เด็ค", "คอร์", "ฟีด",
            "ซอร์ส", "พาส", "ลบ", "ยิง", "สู้", "แอก", "เมนู", "คอม", "ภาพ", "เสียง",
            "บูต", "งาน", "หลัก", "ตัว", "หัว", "ลอง", "ทาง", "จุด", "วง", "วน"
        ],
        zone2: [
            "ปลอดภัย", "ฐานข้อมูล", "อัลกอริทึม", "เจาะระบบ",
            "เขียนคำสั่ง", "เครือข่าย", "บันทึกประวัติ", "เซิร์ฟเวอร์",
            "มัลแวร์", "ถอดรหัส", "เข้ารหัส", "ช่องโหว่",
            "อินเตอร์เฟส", "แฮกเกอร์", "รหัสผ่าน",
            "สแกนช่องโหว่", "ดาวน์โหลด", "กู้คืนระบบ", "คอมพิวเตอร์",
            "ตรวจจับ", "รหัสผ่านคู่", "เครื่องมือ", "ประมวลผล",
            "เชื่อมต่อ", "ตรวจสอบ", "อัพเดท", "ติดตั้ง", "โปรแกรม",
            "ซอฟต์แวร์", "ฮาร์ดแวร์", "ตัวแปร", "ฟังก์ชัน",
            "ออบเจกต์", "คลาส", "วิธีการ", "ส่งออก",
            "นำเข้า", "ลบทิ้ง", "สำรอง", "รักษา", "สัญญาณ",
            "บุกรุก", "คุกคาม", "สกัดกั้น", "ตัวกรอง",
            "เส้นทาง", "สวิตช์", "เราเตอร์", "แพ็กเก็ต",
            "แสดงผล", "จัดการ", "บริการ"
        ],
        zone3: [
            "ปัญญาประดิษฐ์", "ระบบกระจายศูนย์", "เข้ารหัสควอนตัม",
            "แฮกเกอร์อิสระ", "ช่องโหว่ระดับสูง", "ปิดระบบป้องกัน",
            "คอมประสิทธิภาพ", "ตรวจสอบข้อมูล",
            "ตอบโต้ภัยคุกคาม", "พิสูจน์ตัวตน",
            "สิทธิ์ผู้ดูแล", "โจมตีไซเบอร์",
            "สปายแวร์", "ความปลอดภัยคลาวด์",
            "เข้ารหัสลับ", "อินเตอร์เฟส", "โปรโตคอล",
            "ไฟร์วอลล์", "การพิสูจน์ตัวตน", "ความปลอดภัย",
            "โครงสร้างพื้นฐาน", "การประมวลผลคลาวด์", "ประสิทธิภาพสูง",
            "การตรวจสอบสิทธิ์", "การโจมตีไซเบอร์", "การจัดการข้อมูล",
            "ระบบกระจายศูนย์", "เทคโนโลยีบล็อกเชน", "การวิเคราะห์ข้อมูล",
            "การทำงานอัตโนมัติ", "ความเสถียรของระบบ", "รหัสต้นฉบับ",
            "การถอดรหัสข้อมูล", "ความเร็วสูง", "การจำลองสถานการณ์"
        ],
        finisher: [
            "ตัดการเชื่อมต่อ",
            "ทำลายแกนกลาง",
            "กู้คืนระบบ",
            "ปลดล็อครหัส",
            "หยุดการโจมตี",
            "รีสตาร์ทระบบ",
            "สะกิดไวรัส",
            "เปิดใช้งาน",
            "ปลายแฟรมเวิร์ก",
            "จับแหล่งข้อมูล",
            "บังคับใช้",
            "ปิดการป้องกัน"
        ]
    },

    // Code snippets
    code: {
        zone1: [
            "let x = 10;", "console.log(x);", "import math", "print('hello')", "x = int(y)",
            "const data = [];", "return true;", "const fs = require('fs');", "sys.exit(0)", "len(array)",
            "let a = 1;", "const b = 2;", "var c = 3;", "if (a === b)", "while (true)", "for (let i)",
            "return a;", "func main()", "import os", "import sys", "print('ok')", "console.log()",
            "std::cout", "using namespace", "def hello():", "x = y + z", "a.append(b)", "Math.random()",
            "document.write", "alert('error')", "process.exit()", "setTimeout()", "setInterval()"
        ],
        zone2: [
            "for (let i = 0; i < len; i++)", "def fetch_data(ip, port):", "if err: throw new Error(err);",
            "const res = await fetch(url);", "payload = json.loads(request.data)", "class HackerDeck(object):",
            "Object.keys(nodes).forEach(k =>)", "socket.emit('breach', {node: 7});", "sys.stdout.write('OVERRIDE')",
            "for (let key in obj)", "array.map(x => x * 2)", "const express = require('express')",
            "app.listen(port, () =>)", "fetch(url).then(r => r.json())", "if (err) { console.error(err); }",
            "def parse_arguments():", "import cryptography", "hashlib.sha256(data.encode())",
            "const token = generateToken(user)", "localStorage.setItem('key', val)", "db.collection('users').find()"
        ],
        zone3: [
            "async function initBypass(gateway) { return await gateway.crack(128); }",
            "def check_integrity(signature, payload): return hmac.verify(signature, payload)",
            "try { decryptCoreSecurity(coreId); } catch(ex) { dispatchAlarm(ex.message); }",
            "const overrideKey = Buffer.from(zero_secret, 'hex').toString('base64');",
            "app.use(cors({origin: 'https://mainframe.core-7.io'}));",
            "jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);",
            "const decrypt = crypto.createDecipheriv('aes-256-cbc', key, iv);",
            "const server = http.createServer((req, res) => { res.end(); });",
            "localStorage.setItem('session', JSON.stringify(sessionData));",
            "const results = await Promise.all(requests.map(r => r.json()));"
        ],
        finisher: [
            "sys.exit(0)",
            "db.drop()",
            "chmod 777",
            "sudo rm -rf",
            "kill -9",
            "pkill -9",
            "reboot now",
            "shutdown -h",
            "iptables flush",
            "systemctl stop",
            "rm -rf /var",
            "dd if=/dev/zero"
        ]
    }
};


// --- LEARNING CENTER DATA (100 SUB-LESSONS) ---
const LEARN_LESSONS = [
    { id: 1, title: "English Home Row", desc: "พื้นฐานและแป้นเหย้าภาษาอังกฤษ", subLessons: [
        { target: "ready", dialogue: "ไง! ฉัน Zero จะมาสอนนายแฮก... เอ้ย พิมพ์สัมผัส! เริ่มจากท่านั่ง: หลังตรง เท้าเหยียบพื้น ข้อมือไม่แตะโต๊ะนะ พร้อมแล้วพิมพ์ 'ready'" },
        { target: "space", dialogue: "นิ้วโป้งทั้งสองข้างมีไว้กด Spacebar เท่านั้น! ลองกดดูสิ" },
        { target: "a ;", dialogue: "วางนิ้วก้อยซ้ายที่ A และนิ้วก้อยขวาที่ ; (เซมิโคลอน) นี่คือจุดเริ่มของเรา พิมพ์ 'a ;'" },
        { target: "s l", dialogue: "นิ้วนางซ้ายที่ S และนิ้วนางขวาที่ L... พิมพ์ 's l'" },
        { target: "d k", dialogue: "นิ้วกลางซ้ายที่ D และนิ้วกลางขวาที่ K... พิมพ์ 'd k'" },
        { target: "f j", dialogue: "นิ้วชี้ซ้ายที่ F และนิ้วชี้ขวาที่ J... สังเกตขีดนูนๆ บนแป้นด้วยนะ พิมพ์ 'f j'" },
        { target: "g h", dialogue: "นิ้วชี้ซ้ายขยายไป G นิ้วชี้ขวาขยายไป H แล้วดึงกลับมาที่เดิมนะ! พิมพ์ 'g h'" },
        { target: "asdf jkl;", dialogue: "ลองกดปุ่มเหย้าซ้ำๆ เพื่อสร้างความจำกล้ามเนื้อ (Muscle Memory) กัน พิมพ์ 'asdf jkl;'" },
        { target: "sad fad lads jal", dialogue: "ลองผสมคำสั้นๆ เฉพาะแป้นเหย้าดู... พิมพ์ 'sad fad lads jal'" },
        { target: "asdfg hjkl;", dialogue: "แบบทดสอบแป้นเหย้า! พิมพ์ตามนี้เพื่อจบบทเรียน: 'asdfg hjkl;'" },
    ]},
    { id: 2, title: "English Top Row", desc: "แถวบนภาษาอังกฤษ", subLessons: [
        { target: "q w", dialogue: "ขยับขึ้นไปแถวบน! นิ้วก้อยซ้ายไป Q นิ้วนางซ้ายไป W... พิมพ์ 'q w'" },
        { target: "e r t", dialogue: "นิ้วกลางซ้ายไป E นิ้วชี้ซ้ายไป R และ T... พิมพ์ 'e r t'" },
        { target: "y u i", dialogue: "สลับมามือขวา! นิ้วชี้ขวาไป Y และ U นิ้วกลางขวาไป I... พิมพ์ 'y u i'" },
        { target: "o p", dialogue: "นิ้วนางขวาไป O นิ้วก้อยขวาไป P... พิมพ์ 'o p'" },
        { target: "top", dialogue: "เทคนิค: ขยับนิ้วขึ้นไปกดแล้วดึงกลับมาที่แป้นเหย้าทันที! ลองพิมพ์ 'top'" },
        { target: "type route quite", dialogue: "ลองพิมพ์คำแถวบนล้วนดู: 'type route quite'" },
        { target: "wet red tree", dialogue: "ผสมแป้นเหย้า + แถวบน (มือซ้าย): 'wet red tree'" },
        { target: "you oil look", dialogue: "ผสมแป้นเหย้า + แถวบน (มือขวา): 'you oil look'" },
        { target: "the weather is fine", dialogue: "ลองพิมพ์ประโยคสั้นๆ รวมแถวบนและเหย้า: 'the weather is fine'" },
        { target: "qwerty uiop", dialogue: "แบบทดสอบแถวบน! พิมพ์ให้ไว: 'qwerty uiop'" },
    ]},
    { id: 3, title: "English Bottom Row", desc: "แถวล่างภาษาอังกฤษ", subLessons: [
        { target: "z x", dialogue: "ลงมาแถวล่าง! นิ้วก้อยซ้ายไป Z นิ้วนางซ้ายไป X... พิมพ์ 'z x'" },
        { target: "c v b", dialogue: "นิ้วกลางซ้ายไป C นิ้วชี้ซ้ายไป V และ B... พิมพ์ 'c v b'" },
        { target: "n m ,", dialogue: "นิ้วชี้ขวาไป N และ M นิ้วกลางขวาไป , (Comma)... พิมพ์ 'n m ,'" },
        { target: ". /", dialogue: "นิ้วนางขวาไป . (Period) นิ้วก้อยขวาไป / (Slash)... พิมพ์ '. /'" },
        { target: "down", dialogue: "เทคนิค: งอนิ้วลงมาโดยไม่ให้ข้อมือขยับตามนะ! พิมพ์ 'down'" },
        { target: "zoo box coin", dialogue: "คำแถวล่างล้วน: 'zoo box coin'" },
        { target: "apple banana cherry", dialogue: "ผสมอักษร 3 แถว (บน-เหย้า-ล่าง): 'apple banana cherry'" },
        { target: "the quick brown fox jumps over the lazy dog", dialogue: "ประโยคในตำนาน! รวม A-Z ครบทุกตัว: 'the quick brown fox jumps over the lazy dog'" },
        { target: "item, price. total/", dialogue: "กฎ: เว้นวรรคหลัง Comมา และ Period 1 ครั้งเสมอ! พิมพ์ 'item, price. total/'" },
        { target: "zxcvb nm,./", dialogue: "แบบทดสอบแถวล่าง! สมาธิดีๆ: 'zxcvb nm,./'" },
    ]},
    { id: 4, title: "Shift & Punctuation", desc: "ปุ่ม Shift และเครื่องหมายวรรคตอน", subLessons: [
        { target: "Shift", dialogue: "หลักการ: พิมพ์ตัวซ้าย กด Shift ขวา / พิมพ์ตัวขวา กด Shift ซ้าย! พิมพ์ 'Shift'" },
        { target: "A S D F G", dialogue: "ตัวพิมพ์ใหญ่ฝั่งซ้าย (กด Shift ขวาค้าง): 'A S D F G'" },
        { target: "H J K L :", dialogue: "ตัวพิมพ์ใหญ่ฝั่งขวา (กด Shift ซ้ายค้าง): 'H J K L :'" },
        { target: "? \"", dialogue: "เครื่องหมายคำถาม (?) และคำพูด (\"): '? \"'" },
        { target: "( ) !", dialogue: "วงเล็บ ( ) และเครื่องหมายตกใจ (!): '( ) !'" },
        { target: "Zero, Tokyo, Cyber", dialogue: "พิมพ์ชื่อเฉพาะ (ต้องขึ้นต้นด้วยตัวใหญ่): 'Zero, Tokyo, Cyber'" },
        { target: "Who are you?!", dialogue: "ประโยคคำถามและอุทาน: 'Who are you?!'" },
        { target: "Zero: Hello there.", dialogue: "ลองพิมพ์บทสนทนาสั้นๆ: 'Zero: Hello there.'" },
        { target: "focus", dialogue: "จำไว้! อย่ามองแป้น ให้มองที่หน้าจอเท่านั้น! พิมพ์ 'focus'" },
        { target: "System initialized. Preparing for hack sequence!", dialogue: "แบบทดสอบบทความ 1 ย่อหน้า: 'System initialized. Preparing for hack sequence!'" },
    ]},
    { id: 5, title: "Thai Home Row", desc: "แป้นเหย้าภาษาไทย (ฟ ห ก ด ่ า ส ว)", subLessons: [
        { target: "ฟ ห ก ด ่ า ส ว", dialogue: "เปลี่ยนโหมด! วางนิ้วเหมือนเดิม แต่ตอนนี้เป็นไทย (ฟ ห ก ด ่ า ส ว) พิมพ์ 'ฟ ห ก ด ่ า ส ว'" },
        { target: "ฟ ว", dialogue: "นิ้วก้อยซ้าย ฟ นิ้วก้อยขวา ว... พิมพ์ 'ฟ ว'" },
        { target: "ห ส", dialogue: "นิ้วนางซ้าย ห นิ้วนางขวา ส... พิมพ์ 'ห ส'" },
        { target: "ก า", dialogue: "นิ้วกลางซ้าย ก นิ้วกลางขวา า... พิมพ์ 'ก า'" },
        { target: "ด ่", dialogue: "นิ้วชี้ซ้าย ด นิ้วชี้ขวา ่ (ไม้เอก)... พิมพ์ 'ด ่'" },
        { target: "เ ้", dialogue: "ขยายชี้ซ้ายไป เ ชี้ขวาไป ้ (ไม้โท)... พิมพ์ 'เ ้'" },
        { target: "ฟหกด ่าสว", dialogue: "กดไล่ทีละนิ้วให้คล่อง: 'ฟหกด ่าสว'" },
        { target: "ดากา หาสา", dialogue: "ผสมคำสั้นๆ ฝึกนิ้ว: 'ดากา หาสา'" },
        { target: "สาด กาด ว่า เสือ", dialogue: "คำไทยที่มีความหมายบนแป้นเหย้า: 'สาด กาด ว่า เสือ'" },
        { target: "ฟหกเด ้่าสว", dialogue: "แบบทดสอบแป้นเหย้าไทย! พิมพ์ตามนี้: 'ฟหกเด ้่าสว'" },
    ]},
    { id: 6, title: "Thai Top Row", desc: "แถวบนภาษาไทย", subLessons: [
        { target: "ๆ ไ", dialogue: "นิ้วก้อยซ้าย ๆ นิ้วนางซ้าย ไ... พิมพ์ 'ๆ ไ'" },
        { target: "พ ะ ั", dialogue: "นิ้วกลางซ้าย พ นิ้วชี้ซ้าย ะ และ ั... พิมพ์ 'พ ะ ั'" },
        { target: "ี ร น", dialogue: "นิ้วชี้ขวา ี และ ร นิ้วกลางขวา น... พิมพ์ 'ี ร น'" },
        { target: "ย บ ล", dialogue: "นิ้วนางขวา ย นิ้วก้อยขวา บ และ ล... พิมพ์ 'ย บ ล'" },
        { target: "เรียน", dialogue: "จังหวะ: พิมพ์พยัญชนะ สระบน และวรรณยุกต์ให้สัมพันธ์กัน! ลองพิมพ์ 'เรียน'" },
        { target: "เรียน ไป พ่อ", dialogue: "คำศัพท์ 2 พยางค์: 'เรียน ไป พ่อ'" },
        { target: "กิน ข้าว นะ", dialogue: "สระลดรูปและเปลี่ยนรูปแถวบน: 'กิน ข้าว นะ'" },
        { target: "มากๆ เร็วๆ", dialogue: "การใช้ไม้ยมก (ๆ) ให้ถูกวิธี: 'มากๆ เร็วๆ'" },
        { target: "ไปเรียนที่โรงเรียน", dialogue: "วลีสั้นๆ แถวบนและแป้นเหย้า: 'ไปเรียนที่โรงเรียน'" },
        { target: "ๆไพะั ีรนยบล", dialogue: "แบบทดสอบแถวบนไทย! พิมพ์ให้ไว: 'ๆไพะั ีรนยบล'" },
    ]},
    { id: 7, title: "Thai Bottom Row", desc: "แถวล่างภาษาไทย", subLessons: [
        { target: "ผ ป", dialogue: "ลงแถวล่าง! นิ้วก้อยซ้าย ผ นิ้วนางซ้าย ป... พิมพ์ 'ผ ป'" },
        { target: "แ อ", dialogue: "นิ้วกลางซ้าย แ นิ้วชี้ซ้าย อ... พิมพ์ 'แ อ'" },
        { target: "ิ ื ท", dialogue: "นิ้วชี้ขวา ิ และ ื นิ้วกลางขวา ท... พิมพ์ 'ิ ื ท'" },
        { target: "ม ใ ฝ", dialogue: "นิ้วนางขวา ม นิ้วก้อยขวา ใ และ ฝ... พิมพ์ 'ม ใ ฝ'" },
        { target: "มือ เมือง", dialogue: "เทคนิค: พิมพ์สระแถวล่างผสมแถวบนให้แม่น! ลองพิมพ์ 'มือ เมือง'" },
        { target: "มือ ไป มา เมือง", dialogue: "คำศัพท์แถวล่างเป็นหลัก: 'มือ ไป มา เมือง'" },
        { target: "ไปเที่ยวเมืองไทย", dialogue: "ผสม 3 แถวพื้นฐาน ชุดที่ 1: 'ไปเที่ยวเมืองไทย'" },
        { target: "กินข้าวเหนียวมะม่วง", dialogue: "ผสม 3 แถวพื้นฐาน ชุดที่ 2: 'กินข้าวเหนียวมะม่วง'" },
        { target: "แก้ไข", dialogue: "จำไว้! ใช้ปุ่ม Backspace ด้วยนิ้วก้อยขวาโดยไม่เสียตำแหน่งมือนะ! พิมพ์ 'แก้ไข'" },
        { target: "ผปแอ ิืทมใฝ", dialogue: "แบบทดสอบแถวล่างไทย! สมาธิดีๆ: 'ผปแอ ิืทมใฝ'" },
    ]},
    { id: 8, title: "Thai Shift Row", desc: "การใช้ Shift ภาษาไทย (ตัวยาก)", subLessons: [
        { target: "Shift", dialogue: "หลักการ: กด Shift สลับฝั่งมือเหมือนภาษาอังกฤษเลย! พิมพ์ 'Shift'" },
        { target: "ฆ ฎ ฏ ฑ ฒ", dialogue: "ตัวยากฝั่งซ้าย (กด Shift ขวาค้าง): 'ฆ ฎ ฏ ฑ ฒ'" },
        { target: "ณ ญ ษ ศ โ ํ", dialogue: "ตัวยากฝั่งขวา (กด Shift ซ้ายค้าง): 'ณ ญ ษ ศ โ ํ'" },
        { target: "้ ๊ ๋ ์", dialogue: "วรรณยุกต์ ตรี จัตวา และตัวการันต์: '้ ๊ ๋ ์'" },
        { target: "ฐาน ฎีกา", dialogue: "คำศัพท์ตัวยกฝั่งซ้าย: 'ฐาน ฎีกา'" },
        { target: "คุณ ศรี พิษ", dialogue: "คำศัพท์ตัวยกฝั่งขวา: 'คุณ ศรี พิษ'" },
        { target: "ประโยชน์ ทฤษฎี", dialogue: "ผสมตัวธรรมดาและตัวยก: 'ประโยชน์ ทฤษฎี'" },
        { target: "กมล พุทธคาวี", dialogue: "ลองพิมพ์ชื่อ-นามสกุลดู: 'กมล พุทธคาวี'" },
        { target: "relax", dialogue: "ลดความเกร็งของนิ้วเมื่อต้องกด Shift ค้างไว้นะ! พิมพ์ 'relax'" },
        { target: "ประเทศไทยมีวัฒนธรรมที่งดงามและหลากหลาย", dialogue: "แบบทดสอบข้อความตัวยาก! ใจเย็นๆ: 'ประเทศไทยมีวัฒนธรรมที่งดงามและหลากหลาย'" },
    ]},
    { id: 9, title: "Numbers & Symbols", desc: "แป้นตัวเลขและสัญลักษณ์สากล", subLessons: [
        { target: "1 2 3 4 5", dialogue: "ขยับขึ้นไปแถวตัวเลข! มือซ้ายกด 1 2 3 4 5... พิมพ์ '1 2 3 4 5'" },
        { target: "! @ # $ %", dialogue: "สัญลักษณ์มือซ้าย (Shift + ตัวเลข): '! @ # $ %'" },
        { target: "6 7 8 9 0", dialogue: "สลับมามือขวา! 6 7 8 9 0... พิมพ์ '6 7 8 9 0'" },
        { target: "* ^ & ( )", dialogue: "สัญลักษณ์มือขวา (Shift + ตัวเลข): '* ^ & ( )'" },
        { target: "numpad", dialogue: "เทคนิค: คีย์บอร์ดฟูลไซส์จะมีแป้นตัวเลขแยกฝั่งขวา (Numpad) ให้ใช้นะ! พิมพ์ 'numpad'" },
        { target: "10/05/2026", dialogue: "ผสมอักษรและตัวเลข (วันที่): '10/05/2026'" },
        { target: "zero@cyber.th", dialogue: "รูปแบบอีเมลและเว็บไซต์: 'zero@cyber.th'" },
        { target: "P@ssw0rd123!", dialogue: "พิมพ์รหัสผ่านที่ปลอดภัย (ผสมอักษรและสัญลักษณ์): 'P@ssw0rd123!'" },
        { target: "0 O o", dialogue: "ระวัง! เลข 0 (ศูนย์) กับตัวอักษร O (โอ) ไม่เหมือนกันนะ! พิมพ์ '0 O o'" },
        { target: "1+2-3*4/5=0", dialogue: "แบบทดสอบข้อมูลเชิงสถิติ! สู้ๆ: '1+2-3*4/5=0'" },
    ]},
    { id: 10, title: "Shortcuts & Mastery", desc: "คีย์ลัดและการประเมินผลรวม", subLessons: [
        { target: "switch", dialogue: "การเปลี่ยนภาษา: ใช้ Grave Accent (~) หรือ Windows + Space อย่างถูกจังหวะ! พิมพ์ 'switch'" },
        { target: "Ctrl+C Ctrl+V", dialogue: "คีย์ลัดสากล: Ctrl+C (ก๊อบปี้) และ Ctrl+V (วาง)... พิมพ์ 'Ctrl+C Ctrl+V'" },
        { target: "Ctrl+Z Ctrl+A", dialogue: "Ctrl+Z (ย้อนกลับ) และ Ctrl+A (เลือกทั้งหมด)... พิมพ์ 'Ctrl+Z Ctrl+A'" },
        { target: "space enter", dialogue: "เว้นวรรคภาษาไทย 1 ครั้ง (Space) และขึ้นบรรทัดใหม่ (Enter)! พิมพ์ 'space enter'" },
        { target: "practice", dialogue: "ฝึกฝนต่อด้วยตนเองที่ 10FastFingers หรือ TypingClub นะ! พิมพ์ 'practice'" },
        { target: "Hello สวัสดี", dialogue: "แบบฝึกหัดพิมพ์สลับภาษา (ไทย-อังกฤษ): 'Hello สวัสดี'" },
        { target: "cyber hacking is fun", dialogue: "แบบทดสอบความเร็วอังกฤษ (เป้าหมาย 30+ WPM): 'cyber hacking is fun'" },
        { target: "การพิมพ์เร็วคือทักษะสำคัญ", dialogue: "แบบทดสอบความเร็วไทย (เป้าหมาย 30+ WPM): 'การพิมพ์เร็วคือทักษะสำคัญ'" },
        { target: "check", dialogue: "ประเมินตัวเอง: นิ้วไหนยังพลาดบ่อย? สับสนปุ่มไหน? พิมพ์ 'check'" },
        { target: "MASTER HACKER ACHIEVED", dialogue: "ยินดีด้วย! นายจบหลักสูตรแล้ว พร้อมลุยเมนเฟรมหรือยัง? พิมพ์ 'MASTER HACKER ACHIEVED'" },
    ]},
];

// --- CLASSIC TYPING MODE DICTIONARY ---
const CLASSIC_WORDS = {
    en: [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with",
        "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if",
        "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just",
        "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
        "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
        "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because",
        "any", "these", "give", "day", "most", "us", "are", "is", "was", "were", "been", "being", "has",
        "had", "does", "did", "doing", "am", "where", "much", "before", "right", "too", "mean", "old", "same",
        "tell", "boy", "follow", "came", "show", "every", "set", "three", "must", "large", "spell", "add",
        "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change",
        "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point"
    ],
    th: [
        "การ", "ความ", "เป็น", "อยู่", "คือ", "ใน", "และ", "ของ", "ที่", "มี", "ให้", "ได้", "ไป", "มา", "ไม่",
        "จะ", "ด้วย", "แต่", "ว่า", "นี้", "นั้น", "ก็", "ถึง", "จาก", "บน", "ทำ", "คน", "เขา", "เรา", "ฉัน",
        "คุณ", "ผม", "มัน", "สิ่ง", "เรื่อง", "วัน", "ปี", "เดือน", "ดี", "มาก", "น้อย", "ใหญ่", "เล็ก", "ใหม่",
        "เก่า", "แรก", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ", "ร้อย", "พัน",
        "กิน", "เดิน", "นอน", "วิ่ง", "นั่ง", "ทำงาน", "เรียน", "เล่น", "ดู", "เห็น", "รู้", "คิด", "บอก", "พูด",
        "เขียน", "อ่าน", "ฟัง", "เข้าใจ", "จริง", "อาจ", "ต้อง", "ควร", "สามารถ", "หรือ", "ถ้า", "เมื่อ", "แล้ว",
        "ยัง", "เลย", "แค่", "เพียง", "จน", "กว่า", "ก่อน", "หลัง", "เหมือน", "อย่าง", "บาง", "ทุก", "ใคร",
        "ไหน", "อะไร", "ทำไม", "ยังไง", "เวลา", "เช้า", "สาย", "บ่าย", "เย็น", "ค่ำ", "คืน", "น้ำ", "ฟ้า",
        "ดิน", "ลม", "ไฟ", "แสง", "มืด", "สว่าง", "สวย", "น่ารัก", "หล่อ", "รวย", "จน", "แพง", "ถูก", "เงิน",
        "บ้าน", "รถ", "ถนน", "ทาง", "โรงเรียน", "ตลาด", "เมือง", "ประเทศ", "โลก", "ชีวิต", "ใจ", "รัก", "ชอบ"
    ],
    code: [
        "function", "const", "let", "var", "return", "if", "else", "for", "while", "class", "import", "export",
        "async", "await", "try", "catch", "finally", "throw", "new", "this", "super", "extends", "implements",
        "interface", "type", "typeof", "instanceof", "delete", "void", "null", "undefined", "true", "false",
        "console", "log", "error", "warn", "debug", "Promise", "resolve", "reject", "then", "catch", "finally",
        "map", "filter", "reduce", "forEach", "find", "includes", "push", "pop", "shift", "unshift", "splice",
        "slice", "join", "split", "replace", "match", "test", "exec", "parseInt", "parseFloat", "JSON", "stringify",
        "Object", "Array", "String", "Number", "Boolean", "Date", "Math", "RegExp", "Error", "Promise", "Symbol",
        "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "iterator", "generator", "yield", "next", "done",
        "fetch", "then", "catch", "finally", "response", "json", "text", "blob", "arrayBuffer", "formData",
        "headers", "method", "body", "mode", "credentials", "cache", "redirect", "referrer", "integrity"
    ]
};

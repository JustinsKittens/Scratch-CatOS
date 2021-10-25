// MIT license

class CatOS{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('CatOS', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'CatOS',
      name: 'CatOS',
      color1: '#ff0020',
      color2: '#000000',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'CatOS-Main',
          blockType: BlockType.COMMAND,
          text: 'CatOS'
        }
      ]
    }
  }

CatOS-Main (args, util){
{
    targets: [{
        isStage: true,
        name: "Stage",
        variables: {
            "`jEk@4|i[#Fk?(8x)AV.-my variable": ["my variable", "0"],
            "ji@7ecIRX_H2iywO/rpC": ["settingsopen?", "0"],
            "KXoOu7!+D^Mvl-pzWEnv": ["catshopopen?", "0"],
            "ZsA6=PlKI@kskL5e^bFo": ["tacpopopen?", "0"],
            "hPQ=v9XD?esnwtBlq}wA": ["Language", "English"],
            "c)(I)nb-:k6QF0fJ_M]X": ["tacpops", 781]
        },
        lists: {},
        broadcasts: {
            "WAI)+a_[q.A}$$HFHw4r": "message1",
            "k]H_U=/1=t%+Cv^Y2Z]y": "settingsopen",
            "g~aluGRSe@7SP/a`LH6s": "settingsclose",
            "T({T3bFnCe9M=%eIua@g": "catshopopen",
            "x6Cjzb0,Ec`09g9mt[T`": "catshopclose",
            "DSi=nMh(K+k[Ri,diV5M": "tacpopopen",
            "?o3cwOtQ-$/x$B6`L__v": "tacpopclose",
            "1U5]W!E-AQ{+|Kb%c.0=": "sleepmodeenter",
            "f=+PCMVQjDs*mUgu*alt": "sleepmodeexit",
            "AiSce`%8F5Ypfh!h?C}U": "tacpopclick"
        },
        blocks: {},
        comments: {},
        currentCostume: 1,
        costumes: [{
            assetId: "9b6d1e89244a044547888e0426d1b350",
            name: "backdrop2",
            bitmapResolution: 1,
            "md5ext": "9b6d1e89244a044547888e0426d1b350.svg",
            dataFormat: "svg",
            rotationCenterX: 243,
            rotationCenterY: 181.5
        }, {
            assetId: "988a453e894ab16dc95c786f2a5d0377",
            name: "CatOSLauncherBackground",
            bitmapResolution: 2,
            "md5ext": "988a453e894ab16dc95c786f2a5d0377.png",
            dataFormat: "png",
            rotationCenterX: 480,
            rotationCenterY: 360
        }, {
            assetId: "ca28d9632bfd11bc50db1e6a4db018b0",
            name: "backdrop1",
            bitmapResolution: 1,
            "md5ext": "ca28d9632bfd11bc50db1e6a4db018b0.svg",
            dataFormat: "svg",
            rotationCenterX: 240.75000000000009,
            rotationCenterY: 180.25
        }, {
            assetId: "4aca6d8cb04de25e80d327d730222607",
            name: "backdrop3",
            bitmapResolution: 1,
            "md5ext": "4aca6d8cb04de25e80d327d730222607.svg",
            dataFormat: "svg",
            rotationCenterX: 241.135245,
            rotationCenterY: 183.25
        }, {
            assetId: "9066ac03cc19484c307425e06a9c5b37",
            name: "backdrop4",
            bitmapResolution: 1,
            "md5ext": "9066ac03cc19484c307425e06a9c5b37.svg",
            dataFormat: "svg",
            rotationCenterX: 288.75,
            rotationCenterY: 218.75
        }, {
            assetId: "4d884f9a18eb8c00675f6b770d949ca8",
            name: "catpop",
            bitmapResolution: 2,
            "md5ext": "4d884f9a18eb8c00675f6b770d949ca8.png",
            dataFormat: "png",
            rotationCenterX: 480,
            rotationCenterY: 360
        }, {
            assetId: "cd21514d0531fdffb22204e0ec5ed84a",
            name: "backdrop5",
            bitmapResolution: 1,
            "md5ext": "cd21514d0531fdffb22204e0ec5ed84a.svg",
            dataFormat: "svg",
            rotationCenterX: 0,
            rotationCenterY: 0
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 0,
        tempo: 60,
        videoTransparency: 50,
        videoState: "off",
        textToSpeechLanguage: "en"
    }, {
        isStage: false,
        name: "Sprite1",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "_yL?~*KY8}~mH}TlT^bT": {
                opcode: "event_whenflagclicked",
                next: "Bh9=~~lN+%19mp.$^,CV",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 194,
                y: 150
            },
            "`pkIjmZX*#D6u@t-N]WZ": {
                opcode: "videoSensing_videoToggle",
                next: "8Q=e/SXTCx(0eQ:@A)M=",
                parent: ")$@~:Dmg@OJdZ/oSW;?i",
                inputs: {
                    VIDEO_STATE: [1, "U6U!Q`s*[rSi]D^am}/T"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "U6U!Q`s*[rSi]D^am}/T": {
                opcode: "videoSensing_menu_VIDEO_STATE",
                next: null,
                parent: "`pkIjmZX*#D6u@t-N]WZ",
                inputs: {},
                fields: {
                    VIDEO_STATE: ["off", null]
                },
                shadow: true,
                topLevel: false
            },
            "wbeMpA8G#M6HcN=kXS1,": {
                opcode: "control_repeat",
                next: "dN~[c:*lDm`t1;}9|v~X",
                parent: "7G[vg:YWSGBlBy$V$%[#",
                inputs: {
                    TIMES: [1, [6, "10"]],
                    SUBSTACK: [2, "GB9$eKixDiCPkK2]6+%s"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "GB9$eKixDiCPkK2]6+%s": {
                opcode: "control_repeat",
                next: "7G4`n[]Ff~^{V?)BJHR2",
                parent: "wbeMpA8G#M6HcN=kXS1,",
                inputs: {
                    TIMES: [1, [6, "55"]],
                    SUBSTACK: [2, "7m-8r}#M,D,R(O(7dd16"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "7m-8r}#M,D,R(O(7dd16": {
                opcode: "motion_turnright",
                next: null,
                parent: "GB9$eKixDiCPkK2]6+%s",
                inputs: {
                    DEGREES: [1, [4, "5"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "7G4`n[]Ff~^{V?)BJHR2": {
                opcode: "control_repeat",
                next: null,
                parent: "GB9$eKixDiCPkK2]6+%s",
                inputs: {
                    TIMES: [1, [6, "10"]],
                    SUBSTACK: [2, "hga(BJVb]?|fiN40jf2Z"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "hga(BJVb]?|fiN40jf2Z": {
                opcode: "motion_turnright",
                next: null,
                parent: "7G4`n[]Ff~^{V?)BJHR2",
                inputs: {
                    DEGREES: [1, [4, "10"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "dN~[c:*lDm`t1;}9|v~X": {
                opcode: "event_broadcast",
                next: null,
                parent: "wbeMpA8G#M6HcN=kXS1,",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "message1", "WAI)+a_[q.A}$$HFHw4r"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "8Q=e/SXTCx(0eQ:@A)M=": {
                opcode: "looks_switchbackdropto",
                next: "p,N(A/?h8~|3SFmYD+Ne",
                parent: "`pkIjmZX*#D6u@t-N]WZ",
                inputs: {
                    BACKDROP: [1, "}fF0z1m]ia%r_nCWvdks"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "}fF0z1m]ia%r_nCWvdks": {
                opcode: "looks_backdrops",
                next: null,
                parent: "8Q=e/SXTCx(0eQ:@A)M=",
                inputs: {},
                fields: {
                    BACKDROP: ["backdrop2", null]
                },
                shadow: true,
                topLevel: false
            },
            "p,N(A/?h8~|3SFmYD+Ne": {
                opcode: "looks_say",
                next: "U=IBOqp=xfF%v7),rgv_",
                parent: "8Q=e/SXTCx(0eQ:@A)M=",
                inputs: {
                    MESSAGE: [1, [10, "Booting CatOS..."]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "HlbyD~k]D7=1a$fdL=6*": {
                opcode: "text2speech_speakAndWait",
                next: "g.ueK^sLf:)alz2^SKq(",
                parent: "U=IBOqp=xfF%v7),rgv_",
                inputs: {
                    WORDS: [1, [10, "Booting CatOS"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "U=IBOqp=xfF%v7),rgv_": {
                opcode: "text2speech_setVoice",
                next: "HlbyD~k]D7=1a$fdL=6*",
                parent: "p,N(A/?h8~|3SFmYD+Ne",
                inputs: {
                    VOICE: [1, "3iEz(9Tn8!`!${`44lMO"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "3iEz(9Tn8!`!${`44lMO": {
                opcode: "text2speech_menu_voices",
                next: null,
                parent: "U=IBOqp=xfF%v7),rgv_",
                inputs: {},
                fields: {
                    voices: ["TENOR", null]
                },
                shadow: true,
                topLevel: false
            },
            ".O};fFO3!@NybD*hdBCT": {
                opcode: "text2speech_speakAndWait",
                next: "tRmv%0Uf?G^po~W0x)1=",
                parent: "J{7=N4DRT.f6ozb${Bj6",
                inputs: {
                    WORDS: [1, [10, "Booting CatOS"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "J{7=N4DRT.f6ozb${Bj6": {
                opcode: "text2speech_setVoice",
                next: ".O};fFO3!@NybD*hdBCT",
                parent: "ww3]5voBa$J}WuoPx-94",
                inputs: {
                    VOICE: [1, "K;e+t3urgT*~i3z8HC_0"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "K;e+t3urgT*~i3z8HC_0": {
                opcode: "text2speech_menu_voices",
                next: null,
                parent: "J{7=N4DRT.f6ozb${Bj6",
                inputs: {},
                fields: {
                    voices: ["KITTEN", null]
                },
                shadow: true,
                topLevel: false
            },
            "ww3]5voBa$J}WuoPx-94": {
                opcode: "text2speech_speakAndWait",
                next: "J{7=N4DRT.f6ozb${Bj6",
                parent: "g.ueK^sLf:)alz2^SKq(",
                inputs: {
                    WORDS: [1, [10, "Kitten Language:"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "tRmv%0Uf?G^po~W0x)1=": {
                opcode: "text2speech_speakAndWait",
                next: ":2@Nu3BI-bJYiSpyMd^c",
                parent: ".O};fFO3!@NybD*hdBCT",
                inputs: {
                    WORDS: [1, [10, "Once booted, you can change the system language in Settings."]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            ":2@Nu3BI-bJYiSpyMd^c": {
                opcode: "text2speech_setVoice",
                next: null,
                parent: "tRmv%0Uf?G^po~W0x)1=",
                inputs: {
                    VOICE: [1, "dgo8;[LX*9q=_(r6L`Bs"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "dgo8;[LX*9q=_(r6L`Bs": {
                opcode: "text2speech_menu_voices",
                next: null,
                parent: ":2@Nu3BI-bJYiSpyMd^c",
                inputs: {},
                fields: {
                    voices: ["TENOR", null]
                },
                shadow: true,
                topLevel: false
            },
            "7G[vg:YWSGBlBy$V$%[#": {
                opcode: "event_whenflagclicked",
                next: "wbeMpA8G#M6HcN=kXS1,",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 669,
                y: 120
            },
            "1DsQB`znFmsoxa{wGw@k": {
                opcode: "event_whenbroadcastreceived",
                next: "jiB2U3o+kpxW5f|uO]^c",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["message1", "WAI)+a_[q.A}$$HFHw4r"]
                },
                shadow: false,
                topLevel: true,
                x: 697,
                y: 742
            },
            "jiB2U3o+kpxW5f|uO]^c": {
                opcode: "looks_switchbackdropto",
                next: "PrO8{U3ErBkbsep^00X;",
                parent: "1DsQB`znFmsoxa{wGw@k",
                inputs: {
                    BACKDROP: [1, "GTGbbj1wa!^M6ZGG@dMK"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "GTGbbj1wa!^M6ZGG@dMK": {
                opcode: "looks_backdrops",
                next: null,
                parent: "jiB2U3o+kpxW5f|uO]^c",
                inputs: {},
                fields: {
                    BACKDROP: ["CatOSLauncherBackground", null]
                },
                shadow: true,
                topLevel: false
            },
            "PrO8{U3ErBkbsep^00X;": {
                opcode: "looks_hide",
                next: null,
                parent: "jiB2U3o+kpxW5f|uO]^c",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            ")$@~:Dmg@OJdZ/oSW;?i": {
                opcode: "looks_show",
                next: "`pkIjmZX*#D6u@t-N]WZ",
                parent: "Bh9=~~lN+%19mp.$^,CV",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Bh9=~~lN+%19mp.$^,CV": {
                opcode: "looks_switchbackdropto",
                next: ")$@~:Dmg@OJdZ/oSW;?i",
                parent: "_yL?~*KY8}~mH}TlT^bT",
                inputs: {
                    BACKDROP: [1, "s:-jrgvEaG$qz*iR#0Fq"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "s:-jrgvEaG$qz*iR#0Fq": {
                opcode: "looks_backdrops",
                next: null,
                parent: "Bh9=~~lN+%19mp.$^,CV",
                inputs: {},
                fields: {
                    BACKDROP: ["backdrop2", null]
                },
                shadow: true,
                topLevel: false
            },
            "g.ueK^sLf:)alz2^SKq(": {
                opcode: "text2speech_speakAndWait",
                next: "ww3]5voBa$J}WuoPx-94",
                parent: "HlbyD~k]D7=1a$fdL=6*",
                inputs: {
                    WORDS: [1, [10, "Once booted, you can change the system language in Settings."]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "cdf60392818c13683da5cfa089ecb8e1",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "cdf60392818c13683da5cfa089ecb8e1.svg",
            dataFormat: "svg",
            rotationCenterX: 34.5,
            rotationCenterY: 32.99999999999997
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 1,
        visible: false,
        x: 0,
        y: -50,
        size: 100,
        direction: -22,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite2",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "Y?{-QkS#1qfgS(Txt/aT": {
                opcode: "event_whenbroadcastreceived",
                next: "6JX2-lk}Kj_i{6(VWT.q",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["message1", "WAI)+a_[q.A}$$HFHw4r"]
                },
                shadow: false,
                topLevel: true,
                x: 379,
                y: 232
            },
            "6JX2-lk}Kj_i{6(VWT.q": {
                opcode: "looks_show",
                next: "[HD)-n388lnm!Kp9?=NR",
                parent: "Y?{-QkS#1qfgS(Txt/aT",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "[HD)-n388lnm!Kp9?=NR": {
                opcode: "looks_say",
                next: null,
                parent: "6JX2-lk}Kj_i{6(VWT.q",
                inputs: {
                    MESSAGE: [3, "98#1MA]fD!Yo?br~%:|E", [10, "Catrosoft Shop"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "1?4K9@_g=/Bp8n0BzI.8": {
                opcode: "event_whenflagclicked",
                next: "NvfKh,rw3Qw/sAxORRcA",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 66,
                y: 181
            },
            "NvfKh,rw3Qw/sAxORRcA": {
                opcode: "looks_setsizeto",
                next: "0S#51d=MTi_6r3pBPS@5",
                parent: "1?4K9@_g=/Bp8n0BzI.8",
                inputs: {
                    SIZE: [1, [4, "75"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "0S#51d=MTi_6r3pBPS@5": {
                opcode: "looks_hide",
                next: null,
                parent: "NvfKh,rw3Qw/sAxORRcA",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "I_v~+C*:;#I75Eg{84ew": {
                opcode: "event_whenbroadcastreceived",
                next: "%dq?o.z6jHN0~Byff7d!",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsopen", "k]H_U=/1=t%+Cv^Y2Z]y"]
                },
                shadow: false,
                topLevel: true,
                x: 158,
                y: 454
            },
            "%dq?o.z6jHN0~Byff7d!": {
                opcode: "looks_hide",
                next: null,
                parent: "I_v~+C*:;#I75Eg{84ew",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "[UKW}j65F=JVav2Y:C-C": {
                opcode: "event_whenbroadcastreceived",
                next: "SExQU;;.iRZK[vE@hZ46",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsclose", "g~aluGRSe@7SP/a`LH6s"]
                },
                shadow: false,
                topLevel: true,
                x: 449,
                y: 611
            },
            "SExQU;;.iRZK[vE@hZ46": {
                opcode: "looks_show",
                next: null,
                parent: "[UKW}j65F=JVav2Y:C-C",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "KNR:XOLFmP/l?Krc6[Oe": {
                opcode: "event_whenthisspriteclicked",
                next: "Qz9gqtZrBSr|[qOF!XI/",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 37,
                y: 579
            },
            "Qz9gqtZrBSr|[qOF!XI/": {
                opcode: "event_broadcast",
                next: "JZlXJ}4pN[A+;^]RM~TZ",
                parent: "KNR:XOLFmP/l?Krc6[Oe",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "catshopopen", "T({T3bFnCe9M=%eIua@g"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "JZlXJ}4pN[A+;^]RM~TZ": {
                opcode: "looks_switchbackdropto",
                next: null,
                parent: "Qz9gqtZrBSr|[qOF!XI/",
                inputs: {
                    BACKDROP: [1, "DMzsz+%Nu.1cSsyP@Toj"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "DMzsz+%Nu.1cSsyP@Toj": {
                opcode: "looks_backdrops",
                next: null,
                parent: "JZlXJ}4pN[A+;^]RM~TZ",
                inputs: {},
                fields: {
                    BACKDROP: ["backdrop3", null]
                },
                shadow: true,
                topLevel: false
            },
            "4fBQ|Nk_e33rQ|8(+Y4;": {
                opcode: "event_whenbroadcastreceived",
                next: "bWQbZP$g`k!DS.x/voS6",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["catshopopen", "T({T3bFnCe9M=%eIua@g"]
                },
                shadow: false,
                topLevel: true,
                x: 447,
                y: 444
            },
            "bWQbZP$g`k!DS.x/voS6": {
                opcode: "looks_hide",
                next: null,
                parent: "4fBQ|Nk_e33rQ|8(+Y4;",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "1|dzT,nliKX{GdNna-xj": {
                opcode: "event_whenbroadcastreceived",
                next: "5waEcy3EWXu!g`:$[{5u",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["catshopclose", "x6Cjzb0,Ec`09g9mt[T`"]
                },
                shadow: false,
                topLevel: true,
                x: -10,
                y: 347
            },
            "5waEcy3EWXu!g`:$[{5u": {
                opcode: "looks_show",
                next: null,
                parent: "1|dzT,nliKX{GdNna-xj",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "98#1MA]fD!Yo?br~%:|E": {
                opcode: "translate_getTranslate",
                next: null,
                parent: "[HD)-n388lnm!Kp9?=NR",
                inputs: {
                    WORDS: [1, [10, "Catrosoft Shop"]],
                    LANGUAGE: [3, [12, "Language", "hPQ=v9XD?esnwtBlq}wA"], "l!^+5:n-h+R+~(t~2D:9"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "l!^+5:n-h+R+~(t~2D:9": {
                opcode: "translate_menu_languages",
                next: null,
                parent: null,
                inputs: {},
                fields: {
                    languages: ["mi", null]
                },
                shadow: true,
                topLevel: true,
                x: 729,
                y: 340
            },
            "7OoyzJAX##TFFU;l9hwR": {
                opcode: "event_whenbroadcastreceived",
                next: "fx0Z7zYL+R9oDia1[kVm",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopopen", "DSi=nMh(K+k[Ri,diV5M"]
                },
                shadow: false,
                topLevel: true,
                x: -97,
                y: 761
            },
            "~Wtoj{)bbLq@5qyvZU2L": {
                opcode: "event_whenbroadcastreceived",
                next: "iJ;LLe.yJIJFE!V#NvuI",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopclose", "?o3cwOtQ-$/x$B6`L__v"]
                },
                shadow: false,
                topLevel: true,
                x: 309,
                y: 755
            },
            "fx0Z7zYL+R9oDia1[kVm": {
                opcode: "looks_hide",
                next: null,
                parent: "7OoyzJAX##TFFU;l9hwR",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "iJ;LLe.yJIJFE!V#NvuI": {
                opcode: "looks_show",
                next: null,
                parent: "~Wtoj{)bbLq@5qyvZU2L",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "615d3fac591e2196cdd2129a38a9bfeb",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "615d3fac591e2196cdd2129a38a9bfeb.svg",
            dataFormat: "svg",
            rotationCenterX: 136,
            rotationCenterY: 24.8120489903624
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 2,
        visible: true,
        x: -199,
        y: 97,
        size: 75,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite3",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            ";aKr1W$GXq!M#T.R^=-K": {
                opcode: "event_whenflagclicked",
                next: "ZNF$,8tccriRVG{Z5H`{",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 75,
                y: 120
            },
            "OkyBXq2S]n|4OhAM*o,X": {
                opcode: "event_whenbroadcastreceived",
                next: "9hlkg7TgngfnLN-Fpk`B",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["message1", "WAI)+a_[q.A}$$HFHw4r"]
                },
                shadow: false,
                topLevel: true,
                x: 333,
                y: 210
            },
            "OmkUobJw|]Zw$=:vk#sC": {
                opcode: "looks_hide",
                next: null,
                parent: "ZNF$,8tccriRVG{Z5H`{",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "9hlkg7TgngfnLN-Fpk`B": {
                opcode: "looks_show",
                next: "c1}#Roj%^hk4AV?-c6{E",
                parent: "OkyBXq2S]n|4OhAM*o,X",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "c1}#Roj%^hk4AV?-c6{E": {
                opcode: "looks_say",
                next: null,
                parent: "9hlkg7TgngfnLN-Fpk`B",
                inputs: {
                    MESSAGE: [3, "XSvpg)e%.q8?w~l:q2|T", [10, "Settings"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "ZNF$,8tccriRVG{Z5H`{": {
                opcode: "looks_setsizeto",
                next: "OmkUobJw|]Zw$=:vk#sC",
                parent: ";aKr1W$GXq!M#T.R^=-K",
                inputs: {
                    SIZE: [1, [4, "75"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "vgHD2)!~IAi4Z}Q/fb_i": {
                opcode: "event_whenthisspriteclicked",
                next: "+~~o+!?R).(eIoh)LBmE",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 129,
                y: 453
            },
            "+~~o+!?R).(eIoh)LBmE": {
                opcode: "event_broadcast",
                next: "97%HyoYll8Uh:XrU,nSz",
                parent: "vgHD2)!~IAi4Z}Q/fb_i",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "settingsopen", "k]H_U=/1=t%+Cv^Y2Z]y"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "97%HyoYll8Uh:XrU,nSz": {
                opcode: "looks_switchbackdropto",
                next: null,
                parent: "+~~o+!?R).(eIoh)LBmE",
                inputs: {
                    BACKDROP: [1, "2m5-G33OU(j{sfw#K((V"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "2m5-G33OU(j{sfw#K((V": {
                opcode: "looks_backdrops",
                next: null,
                parent: "97%HyoYll8Uh:XrU,nSz",
                inputs: {},
                fields: {
                    BACKDROP: ["backdrop1", null]
                },
                shadow: true,
                topLevel: false
            },
            "#(-/t{bUW.;`i-$2{v0+": {
                opcode: "event_whenbroadcastreceived",
                next: "SfEhOGL3x=D[M{xa8azu",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsopen", "k]H_U=/1=t%+Cv^Y2Z]y"]
                },
                shadow: false,
                topLevel: true,
                x: 484,
                y: 465
            },
            "SfEhOGL3x=D[M{xa8azu": {
                opcode: "looks_hide",
                next: null,
                parent: "#(-/t{bUW.;`i-$2{v0+",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "8)KB$I36SnI,QsrQfvlo": {
                opcode: "event_whenbroadcastreceived",
                next: "$NAfx4n925%DH2)Ue|*u",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsclose", "g~aluGRSe@7SP/a`LH6s"]
                },
                shadow: false,
                topLevel: true,
                x: 90,
                y: 659
            },
            "$NAfx4n925%DH2)Ue|*u": {
                opcode: "looks_show",
                next: null,
                parent: "8)KB$I36SnI,QsrQfvlo",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "53Fb?F3IUEE-uA=3KucY": {
                opcode: "event_whenbroadcastreceived",
                next: "szT+/{P]l37,mplMo*I)",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["catshopopen", "T({T3bFnCe9M=%eIua@g"]
                },
                shadow: false,
                topLevel: true,
                x: 417,
                y: 622
            },
            "szT+/{P]l37,mplMo*I)": {
                opcode: "looks_hide",
                next: null,
                parent: "53Fb?F3IUEE-uA=3KucY",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "m_IFssrd5}L@UUckv4.t": {
                opcode: "event_whenbroadcastreceived",
                next: "%uk}M~-/0fuJ_Tz4i(.s",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["catshopclose", "x6Cjzb0,Ec`09g9mt[T`"]
                },
                shadow: false,
                topLevel: true,
                x: -25,
                y: 339
            },
            "%uk}M~-/0fuJ_Tz4i(.s": {
                opcode: "looks_show",
                next: null,
                parent: "m_IFssrd5}L@UUckv4.t",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "XSvpg)e%.q8?w~l:q2|T": {
                opcode: "translate_getTranslate",
                next: null,
                parent: "c1}#Roj%^hk4AV?-c6{E",
                inputs: {
                    WORDS: [1, [10, "Settings"]],
                    LANGUAGE: [3, [12, "Language", "hPQ=v9XD?esnwtBlq}wA"], "lfji=lZ@L|Bn/~TY#.vS"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "lfji=lZ@L|Bn/~TY#.vS": {
                opcode: "translate_menu_languages",
                next: null,
                parent: null,
                inputs: {},
                fields: {
                    languages: ["mi", null]
                },
                shadow: true,
                topLevel: true,
                x: 633,
                y: 318
            },
            "EF~GX_Nmn/RQPLdkiY{#": {
                opcode: "event_whenbroadcastreceived",
                next: "Z{^2iD`IYz?gKDhVUu.o",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopclose", "?o3cwOtQ-$/x$B6`L__v"]
                },
                shadow: false,
                topLevel: true,
                x: 400,
                y: 792
            },
            "#Ht%W[v#L3O/i2:M$3rz": {
                opcode: "event_whenbroadcastreceived",
                next: "|~;atz{3iyG}p]Up@Jb}",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopopen", "DSi=nMh(K+k[Ri,diV5M"]
                },
                shadow: false,
                topLevel: true,
                x: 76,
                y: 795
            },
            "Z{^2iD`IYz?gKDhVUu.o": {
                opcode: "looks_show",
                next: null,
                parent: "EF~GX_Nmn/RQPLdkiY{#",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "|~;atz{3iyG}p]Up@Jb}": {
                opcode: "looks_hide",
                next: null,
                parent: "#Ht%W[v#L3O/i2:M$3rz",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "f91d13f7956712fdd2b778ea8c8493bb",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "f91d13f7956712fdd2b778ea8c8493bb.svg",
            dataFormat: "svg",
            rotationCenterX: 25.512428025381013,
            rotationCenterY: 28.036865173525314
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 3,
        visible: true,
        x: -26,
        y: 98,
        size: 75,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "catpop",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "9hk=],|mcZ$F$:/Dp~tk": {
                opcode: "event_whenflagclicked",
                next: "fSi(JgCQN21E$IbhTskN",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 170,
                y: 185
            },
            "fSi(JgCQN21E$IbhTskN": {
                opcode: "looks_hide",
                next: null,
                parent: "9hk=],|mcZ$F$:/Dp~tk",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "7r#G:2O1+NP$J,.un-a-": {
                opcode: "event_whenbroadcastreceived",
                next: "AOuxj@XubBL^auQ7kH~d",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["message1", "WAI)+a_[q.A}$$HFHw4r"]
                },
                shadow: false,
                topLevel: true,
                x: 360,
                y: 175
            },
            "AOuxj@XubBL^auQ7kH~d": {
                opcode: "looks_show",
                next: "P9nvunIm;z;.hEKWoHA3",
                parent: "7r#G:2O1+NP$J,.un-a-",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "P9nvunIm;z;.hEKWoHA3": {
                opcode: "looks_say",
                next: null,
                parent: "AOuxj@XubBL^auQ7kH~d",
                inputs: {
                    MESSAGE: [3, "na,C#OAyOWOk2ibOw7X0", [10, "Tacpop"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "na,C#OAyOWOk2ibOw7X0": {
                opcode: "translate_getTranslate",
                next: null,
                parent: "P9nvunIm;z;.hEKWoHA3",
                inputs: {
                    WORDS: [1, [10, "TacPop"]],
                    LANGUAGE: [3, [12, "Language", "hPQ=v9XD?esnwtBlq}wA"], "tTpmC==sF7!W$TySO;;p"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "tTpmC==sF7!W$TySO;;p": {
                opcode: "translate_menu_languages",
                next: null,
                parent: "na,C#OAyOWOk2ibOw7X0",
                inputs: {},
                fields: {
                    languages: ["mi", null]
                },
                shadow: true,
                topLevel: false
            },
            "ObrpnG`,J7;IM`GZ!ZjZ": {
                opcode: "event_whenbroadcastreceived",
                next: "%d`9HC45_K4JYGS_,e9f",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsopen", "k]H_U=/1=t%+Cv^Y2Z]y"]
                },
                shadow: false,
                topLevel: true,
                x: 367,
                y: 418
            },
            "%d`9HC45_K4JYGS_,e9f": {
                opcode: "looks_hide",
                next: null,
                parent: "ObrpnG`,J7;IM`GZ!ZjZ",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "hm.5PWAW%dd#v`-:9j.Y": {
                opcode: "event_whenbroadcastreceived",
                next: "ei6Vd3vRu^$1n`oRfewP",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsclose", "g~aluGRSe@7SP/a`LH6s"]
                },
                shadow: false,
                topLevel: true,
                x: 78,
                y: 620
            },
            "ei6Vd3vRu^$1n`oRfewP": {
                opcode: "looks_show",
                next: null,
                parent: "hm.5PWAW%dd#v`-:9j.Y",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "%/2_g.fIcVSPj%(%{}V4": {
                opcode: "event_whenbroadcastreceived",
                next: "3uHinT~aCRjVAJ=hLf6C",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["catshopopen", "T({T3bFnCe9M=%eIua@g"]
                },
                shadow: false,
                topLevel: true,
                x: 376,
                y: 564
            },
            "3uHinT~aCRjVAJ=hLf6C": {
                opcode: "looks_hide",
                next: null,
                parent: "%/2_g.fIcVSPj%(%{}V4",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "pAI@?Jp?eQvI3[g3ZF0$": {
                opcode: "event_whenbroadcastreceived",
                next: "!MzW;M3]4taiFJYU9C6I",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["catshopclose", "x6Cjzb0,Ec`09g9mt[T`"]
                },
                shadow: false,
                topLevel: true,
                x: 111,
                y: 349
            },
            "!MzW;M3]4taiFJYU9C6I": {
                opcode: "looks_show",
                next: null,
                parent: "pAI@?Jp?eQvI3[g3ZF0$",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "e-^q4W7j}+w9*WRXwsY1": {
                opcode: "event_whenthisspriteclicked",
                next: "ZSe2EboinGA7%_1z$yYl",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 52,
                y: 26
            },
            "ZSe2EboinGA7%_1z$yYl": {
                opcode: "event_broadcast",
                next: "{}6=of:?b$iT+6`:_-9T",
                parent: "e-^q4W7j}+w9*WRXwsY1",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "tacpopopen", "DSi=nMh(K+k[Ri,diV5M"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "{}6=of:?b$iT+6`:_-9T": {
                opcode: "looks_switchbackdropto",
                next: null,
                parent: "ZSe2EboinGA7%_1z$yYl",
                inputs: {
                    BACKDROP: [1, "H2}2f`[L{@)9-,]fu7{|"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "H2}2f`[L{@)9-,]fu7{|": {
                opcode: "looks_backdrops",
                next: null,
                parent: "{}6=of:?b$iT+6`:_-9T",
                inputs: {},
                fields: {
                    BACKDROP: ["catpop", null]
                },
                shadow: true,
                topLevel: false
            },
            "sJQa[6T?{Wk9fMIIdWHK": {
                opcode: "event_whenbroadcastreceived",
                next: "BTI33v=6JJ?t;sqv%c*?",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopclose", "?o3cwOtQ-$/x$B6`L__v"]
                },
                shadow: false,
                topLevel: true,
                x: 70,
                y: 767
            },
            "=#gsP?Er!is*!J]`qsG~": {
                opcode: "event_whenbroadcastreceived",
                next: "U3R_|OunD8+T9}{z|p%g",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopopen", "DSi=nMh(K+k[Ri,diV5M"]
                },
                shadow: false,
                topLevel: true,
                x: 386,
                y: 709
            },
            "BTI33v=6JJ?t;sqv%c*?": {
                opcode: "looks_show",
                next: "4@Txcw5S1q-C6L6UnrQg",
                parent: "sJQa[6T?{Wk9fMIIdWHK",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "U3R_|OunD8+T9}{z|p%g": {
                opcode: "looks_hide",
                next: "._J1,@XResgRvhMfJ0K)",
                parent: "=#gsP?Er!is*!J]`qsG~",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "4@Txcw5S1q-C6L6UnrQg": {
                opcode: "data_hidevariable",
                next: null,
                parent: "BTI33v=6JJ?t;sqv%c*?",
                inputs: {},
                fields: {
                    VARIABLE: ["tacpops", "c)(I)nb-:k6QF0fJ_M]X"]
                },
                shadow: false,
                topLevel: false
            },
            "._J1,@XResgRvhMfJ0K)": {
                opcode: "data_showvariable",
                next: null,
                parent: "U3R_|OunD8+T9}{z|p%g",
                inputs: {},
                fields: {
                    VARIABLE: ["tacpops", "c)(I)nb-:k6QF0fJ_M]X"]
                },
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "d43f8c50047e22ea685863b67cecd2cc",
            name: "catpop",
            bitmapResolution: 2,
            "md5ext": "d43f8c50047e22ea685863b67cecd2cc.jpg",
            dataFormat: "jpg",
            rotationCenterX: 360,
            rotationCenterY: 360
        }],
        sounds: [],
        volume: 100,
        layerOrder: 4,
        visible: true,
        x: 117,
        y: 93,
        size: 10,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite4",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "1G;-%a?MB5_C{Y0+{j^{": {
                opcode: "event_whenbroadcastreceived",
                next: "bR@x:][lkmF#Y-FLp[]g",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsopen", "k]H_U=/1=t%+Cv^Y2Z]y"]
                },
                shadow: false,
                topLevel: true,
                x: 63,
                y: 509
            },
            "bR@x:][lkmF#Y-FLp[]g": {
                opcode: "data_setvariableto",
                next: null,
                parent: "1G;-%a?MB5_C{Y0+{j^{",
                inputs: {
                    VALUE: [1, [10, "1"]]
                },
                fields: {
                    VARIABLE: ["settingsopen?", "ji@7ecIRX_H2iywO/rpC"]
                },
                shadow: false,
                topLevel: false
            },
            "(DFcksh6inM+jpJwWtB;": {
                opcode: "event_whenthisspriteclicked",
                next: "b8vnVxBf8Oy(kP!{%NKK",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 375,
                y: 203
            },
            "b8vnVxBf8Oy(kP!{%NKK": {
                opcode: "control_if",
                next: null,
                parent: "(DFcksh6inM+jpJwWtB;",
                inputs: {
                    CONDITION: [2, "6RJ}!dy`HO21WpXQtc$1"],
                    SUBSTACK: [2, "/zjWx/R8Sk6;Zqc+P!6q"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "6RJ}!dy`HO21WpXQtc$1": {
                opcode: "operator_equals",
                next: null,
                parent: "b8vnVxBf8Oy(kP!{%NKK",
                inputs: {
                    "OPERAND1": [3, [12, "settingsopen?", "ji@7ecIRX_H2iywO/rpC"],
                        [10, ""]
                    ],
                    "OPERAND2": [1, [10, "1"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "/zjWx/R8Sk6;Zqc+P!6q": {
                opcode: "event_broadcast",
                next: "8/!rPoI0Fqm6T3{^1Y]5",
                parent: "b8vnVxBf8Oy(kP!{%NKK",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "settingsclose", "g~aluGRSe@7SP/a`LH6s"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "$faC;7$]47WBmfx:vU`L": {
                opcode: "event_whenflagclicked",
                next: "j,-2RGo:v0[j)?S-Jx[}",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 81,
                y: 227
            },
            "J1j7wF$]axRjb-{PgDMW": {
                opcode: "looks_hide",
                next: null,
                parent: "Mo:$,lJ,#g8:b}(q|EiH",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "8/!rPoI0Fqm6T3{^1Y]5": {
                opcode: "looks_switchbackdropto",
                next: "9a{[_I_3)IlO|;T0I%It",
                parent: "/zjWx/R8Sk6;Zqc+P!6q",
                inputs: {
                    BACKDROP: [1, "Mk[op*?OA67WUy8_8C;g"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Mk[op*?OA67WUy8_8C;g": {
                opcode: "looks_backdrops",
                next: null,
                parent: "8/!rPoI0Fqm6T3{^1Y]5",
                inputs: {},
                fields: {
                    BACKDROP: ["CatOSLauncherBackground", null]
                },
                shadow: true,
                topLevel: false
            },
            "9a{[_I_3)IlO|;T0I%It": {
                opcode: "data_setvariableto",
                next: "gn=GewF$s@3Pt=02FfMd",
                parent: "8/!rPoI0Fqm6T3{^1Y]5",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["settingsopen?", "ji@7ecIRX_H2iywO/rpC"]
                },
                shadow: false,
                topLevel: false
            },
            "gn=GewF$s@3Pt=02FfMd": {
                opcode: "looks_hide",
                next: null,
                parent: "9a{[_I_3)IlO|;T0I%It",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "h-aDxxF?F2;sEK@j)Pq|": {
                opcode: "event_whenflagclicked",
                next: "C#7~5g^AdLud6WHA.!V!",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 420,
                y: 635
            },
            "C#7~5g^AdLud6WHA.!V!": {
                opcode: "control_forever",
                next: null,
                parent: "h-aDxxF?F2;sEK@j)Pq|",
                inputs: {
                    SUBSTACK: [2, "CVqKAfn*?//9N@Kt]6vd"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "#(f#MOZ3eAWO!Q#6!6*2": {
                opcode: "operator_or",
                next: null,
                parent: "CVqKAfn*?//9N@Kt]6vd",
                inputs: {
                    "OPERAND2": [2, "f]%TZ7,5fo,*b4l6+d@8"],
                    "OPERAND1": [2, "sy[a!|(Dq#^SIzy_VC`X"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "CVqKAfn*?//9N@Kt]6vd": {
                opcode: "control_if_else",
                next: null,
                parent: "C#7~5g^AdLud6WHA.!V!",
                inputs: {
                    CONDITION: [2, "#(f#MOZ3eAWO!Q#6!6*2"],
                    SUBSTACK: [2, "RUm~Nc+H,Oxa(wC3Zg|^"],
                    "SUBSTACK2": [2, "7kE9@O;g;d3id~qfnc(a"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "f]%TZ7,5fo,*b4l6+d@8": {
                opcode: "operator_or",
                next: null,
                parent: "#(f#MOZ3eAWO!Q#6!6*2",
                inputs: {
                    "OPERAND2": [2, "[*ols=BTZ7;dh}2Ve^])"],
                    "OPERAND1": [2, "lAu_l/eQEm3^D$[t{W#["]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "sy[a!|(Dq#^SIzy_VC`X": {
                opcode: "operator_equals",
                next: null,
                parent: "#(f#MOZ3eAWO!Q#6!6*2",
                inputs: {
                    "OPERAND1": [3, [12, "settingsopen?", "ji@7ecIRX_H2iywO/rpC"],
                        [10, ""]
                    ],
                    "OPERAND2": [1, [10, "1"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "[*ols=BTZ7;dh}2Ve^])": {
                opcode: "operator_equals",
                next: null,
                parent: "f]%TZ7,5fo,*b4l6+d@8",
                inputs: {
                    "OPERAND1": [3, [12, "tacpopopen?", "ZsA6=PlKI@kskL5e^bFo"],
                        [10, ""]
                    ],
                    "OPERAND2": [1, [10, "1"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "lAu_l/eQEm3^D$[t{W#[": {
                opcode: "operator_equals",
                next: null,
                parent: "f]%TZ7,5fo,*b4l6+d@8",
                inputs: {
                    "OPERAND1": [3, [12, "catshopopen?", "KXoOu7!+D^Mvl-pzWEnv"],
                        [10, ""]
                    ],
                    "OPERAND2": [1, [10, "1"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "RUm~Nc+H,Oxa(wC3Zg|^": {
                opcode: "looks_show",
                next: null,
                parent: "CVqKAfn*?//9N@Kt]6vd",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "7kE9@O;g;d3id~qfnc(a": {
                opcode: "looks_hide",
                next: null,
                parent: "CVqKAfn*?//9N@Kt]6vd",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "$/vnvdDgm6+cH=:E,1U~": {
                opcode: "event_whenthisspriteclicked",
                next: "CuQ8Wy6WvN)wG^4e!o.R",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 822,
                y: 213
            },
            "CuQ8Wy6WvN)wG^4e!o.R": {
                opcode: "control_if",
                next: null,
                parent: "$/vnvdDgm6+cH=:E,1U~",
                inputs: {
                    CONDITION: [2, "h5|M[Zf5c;/O$T|+K/F`"],
                    SUBSTACK: [2, "6LG#@~D:H}:)0iz??]j."]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "h5|M[Zf5c;/O$T|+K/F`": {
                opcode: "operator_equals",
                next: null,
                parent: "CuQ8Wy6WvN)wG^4e!o.R",
                inputs: {
                    "OPERAND1": [3, [12, "catshopopen?", "KXoOu7!+D^Mvl-pzWEnv"],
                        [10, ""]
                    ],
                    "OPERAND2": [1, [10, "1"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "6LG#@~D:H}:)0iz??]j.": {
                opcode: "event_broadcast",
                next: "wa0{yEyrF*1D!!T]vxDF",
                parent: "CuQ8Wy6WvN)wG^4e!o.R",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "catshopclose", "x6Cjzb0,Ec`09g9mt[T`"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "wa0{yEyrF*1D!!T]vxDF": {
                opcode: "looks_switchbackdropto",
                next: "Pigk4Wx]58ku3|+b9W@-",
                parent: "6LG#@~D:H}:)0iz??]j.",
                inputs: {
                    BACKDROP: [1, ")Cka*V)$fJ!OR)e,3Voz"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            ")Cka*V)$fJ!OR)e,3Voz": {
                opcode: "looks_backdrops",
                next: null,
                parent: "wa0{yEyrF*1D!!T]vxDF",
                inputs: {},
                fields: {
                    BACKDROP: ["CatOSLauncherBackground", null]
                },
                shadow: true,
                topLevel: false
            },
            "Pigk4Wx]58ku3|+b9W@-": {
                opcode: "data_setvariableto",
                next: ",Y@^VAOA+oqN%-^4,Uk_",
                parent: "wa0{yEyrF*1D!!T]vxDF",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["catshopopen?", "KXoOu7!+D^Mvl-pzWEnv"]
                },
                shadow: false,
                topLevel: false
            },
            ",Y@^VAOA+oqN%-^4,Uk_": {
                opcode: "looks_hide",
                next: null,
                parent: "Pigk4Wx]58ku3|+b9W@-",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "if1uVnY~rf/Y6JD1+l_=": {
                opcode: "event_whenbroadcastreceived",
                next: "{dv0]_[R`:M0Ta_FMh-B",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["catshopopen", "T({T3bFnCe9M=%eIua@g"]
                },
                shadow: false,
                topLevel: true,
                x: 80,
                y: 703
            },
            "{dv0]_[R`:M0Ta_FMh-B": {
                opcode: "data_setvariableto",
                next: null,
                parent: "if1uVnY~rf/Y6JD1+l_=",
                inputs: {
                    VALUE: [1, [10, "1"]]
                },
                fields: {
                    VARIABLE: ["catshopopen?", "KXoOu7!+D^Mvl-pzWEnv"]
                },
                shadow: false,
                topLevel: false
            },
            "sJ^`Hskab-I$2ks;(X?;": {
                opcode: "event_whenbroadcastreceived",
                next: "g.!$#(d5D]`o0(gx!.BP",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopopen", "DSi=nMh(K+k[Ri,diV5M"]
                },
                shadow: false,
                topLevel: true,
                x: 69,
                y: 831
            },
            "g.!$#(d5D]`o0(gx!.BP": {
                opcode: "data_setvariableto",
                next: null,
                parent: "sJ^`Hskab-I$2ks;(X?;",
                inputs: {
                    VALUE: [1, [10, "1"]]
                },
                fields: {
                    VARIABLE: ["tacpopopen?", "ZsA6=PlKI@kskL5e^bFo"]
                },
                shadow: false,
                topLevel: false
            },
            "wEqr_{j@e9,LsKXJN:cq": {
                opcode: "event_whenthisspriteclicked",
                next: "/a1aGKrD@2e.}FVo)hS5",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 1241,
                y: 216
            },
            "/a1aGKrD@2e.}FVo)hS5": {
                opcode: "control_if",
                next: null,
                parent: "wEqr_{j@e9,LsKXJN:cq",
                inputs: {
                    CONDITION: [2, "_Oav*t0NINXC*/m6b6.["],
                    SUBSTACK: [2, ",Q#T#-Ntfy17S~{q@##:"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "_Oav*t0NINXC*/m6b6.[": {
                opcode: "operator_equals",
                next: null,
                parent: "/a1aGKrD@2e.}FVo)hS5",
                inputs: {
                    "OPERAND1": [3, [12, "tacpopopen?", "ZsA6=PlKI@kskL5e^bFo"],
                        [10, ""]
                    ],
                    "OPERAND2": [1, [10, "1"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            ",Q#T#-Ntfy17S~{q@##:": {
                opcode: "event_broadcast",
                next: "%:Zh:p5#/RLe7lHI5b/T",
                parent: "/a1aGKrD@2e.}FVo)hS5",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "tacpopclose", "?o3cwOtQ-$/x$B6`L__v"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "%:Zh:p5#/RLe7lHI5b/T": {
                opcode: "looks_switchbackdropto",
                next: "_BnVQ#[6vCNAG@c6D+lX",
                parent: ",Q#T#-Ntfy17S~{q@##:",
                inputs: {
                    BACKDROP: [1, "NZ:j_,urb;Cs!$~w[*Dr"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "NZ:j_,urb;Cs!$~w[*Dr": {
                opcode: "looks_backdrops",
                next: null,
                parent: "%:Zh:p5#/RLe7lHI5b/T",
                inputs: {},
                fields: {
                    BACKDROP: ["CatOSLauncherBackground", null]
                },
                shadow: true,
                topLevel: false
            },
            "_BnVQ#[6vCNAG@c6D+lX": {
                opcode: "data_setvariableto",
                next: "Je^rvJOM/Yt$+mlucz84",
                parent: "%:Zh:p5#/RLe7lHI5b/T",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["tacpopopen?", "ZsA6=PlKI@kskL5e^bFo"]
                },
                shadow: false,
                topLevel: false
            },
            "Je^rvJOM/Yt$+mlucz84": {
                opcode: "looks_hide",
                next: null,
                parent: "_BnVQ#[6vCNAG@c6D+lX",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "@u.]9E;5TteAxwPW:#eu": {
                opcode: "data_setvariableto",
                next: "Mo:$,lJ,#g8:b}(q|EiH",
                parent: "j,-2RGo:v0[j)?S-Jx[}",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["settingsopen?", "ji@7ecIRX_H2iywO/rpC"]
                },
                shadow: false,
                topLevel: false
            },
            "Mo:$,lJ,#g8:b}(q|EiH": {
                opcode: "data_setvariableto",
                next: "J1j7wF$]axRjb-{PgDMW",
                parent: "@u.]9E;5TteAxwPW:#eu",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["tacpopopen?", "ZsA6=PlKI@kskL5e^bFo"]
                },
                shadow: false,
                topLevel: false
            },
            "j,-2RGo:v0[j)?S-Jx[}": {
                opcode: "data_setvariableto",
                next: "@u.]9E;5TteAxwPW:#eu",
                parent: "$faC;7$]47WBmfx:vU`L",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["catshopopen?", "KXoOu7!+D^Mvl-pzWEnv"]
                },
                shadow: false,
                topLevel: false
            },
            "*JQ2ATJY^tnrX?m~g8}g": {
                opcode: "event_whenbroadcastreceived",
                next: "I8E!4aW%U0b=Qr=[}=uv",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeenter", "1U5]W!E-AQ{+|Kb%c.0="]
                },
                shadow: false,
                topLevel: true,
                x: -228,
                y: 666
            },
            "Pq!$fSMJIaXNNjaQp_Yb": {
                opcode: "event_whenbroadcastreceived",
                next: "B%C{(:Y*e6T8uSowo*pm",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeexit", "f=+PCMVQjDs*mUgu*alt"]
                },
                shadow: false,
                topLevel: true,
                x: -237,
                y: 863
            },
            "u7TI%{P4m4mEi/+DnWEI": {
                opcode: "looks_hide",
                next: null,
                parent: "I8E!4aW%U0b=Qr=[}=uv",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "IfD6qPN;Hh[N_B35Yf{/": {
                opcode: "looks_show",
                next: null,
                parent: "B%C{(:Y*e6T8uSowo*pm",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "I8E!4aW%U0b=Qr=[}=uv": {
                opcode: "data_setvariableto",
                next: "u7TI%{P4m4mEi/+DnWEI",
                parent: "*JQ2ATJY^tnrX?m~g8}g",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["settingsopen?", "ji@7ecIRX_H2iywO/rpC"]
                },
                shadow: false,
                topLevel: false
            },
            "B%C{(:Y*e6T8uSowo*pm": {
                opcode: "data_setvariableto",
                next: "IfD6qPN;Hh[N_B35Yf{/",
                parent: "Pq!$fSMJIaXNNjaQp_Yb",
                inputs: {
                    VALUE: [1, [10, "1"]]
                },
                fields: {
                    VARIABLE: ["settingsopen?", "ji@7ecIRX_H2iywO/rpC"]
                },
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "50c035c221e04a5a7565a1cf04f2ae7b",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "50c035c221e04a5a7565a1cf04f2ae7b.svg",
            dataFormat: "svg",
            rotationCenterX: -171.097825,
            rotationCenterY: 148.75
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 5,
        visible: false,
        x: 36,
        y: 28,
        size: 100,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite5",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "=focmyesX+Owj!.*A}TI": {
                opcode: "event_whenflagclicked",
                next: "?X|8hzdmlBpuZ(zgv5+p",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 201,
                y: 242
            },
            "Uf9dG-zn4Xj|H.Zh(`?c": {
                opcode: "event_whenbroadcastreceived",
                next: "_[Me5PfZFZG|N@jlN-A9",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsopen", "k]H_U=/1=t%+Cv^Y2Z]y"]
                },
                shadow: false,
                topLevel: true,
                x: 428,
                y: 279
            },
            "IEO-S@:hx3GefZa:lsX[": {
                opcode: "event_whenbroadcastreceived",
                next: "g:s)A1@{9[3^$1l5Ga.$",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsclose", "g~aluGRSe@7SP/a`LH6s"]
                },
                shadow: false,
                topLevel: true,
                x: 281,
                y: 378
            },
            "?X|8hzdmlBpuZ(zgv5+p": {
                opcode: "looks_hide",
                next: null,
                parent: "=focmyesX+Owj!.*A}TI",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "_[Me5PfZFZG|N@jlN-A9": {
                opcode: "looks_show",
                next: null,
                parent: "Uf9dG-zn4Xj|H.Zh(`?c",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "g:s)A1@{9[3^$1l5Ga.$": {
                opcode: "looks_hide",
                next: null,
                parent: "IEO-S@:hx3GefZa:lsX[",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "3ZfkT@:|Zcs{F(|dT%pL": {
                opcode: "event_whenthisspriteclicked",
                next: "cIP1Pz|=R3i3!zzxV|+d",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 187,
                y: 585
            },
            "=H,YUt(Z5C2wpsl%i0Ih": {
                opcode: "text2speech_setLanguage",
                next: "B?`UiL`A2f~Gr1j4+n;c",
                parent: "=V5k6Hu]xiyRn9=oyrmD",
                inputs: {
                    LANGUAGE: [3, "lC]bE(#,t+}==[yKC36i", "h:MijhZ5twoCWw6]*bY,"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "h:MijhZ5twoCWw6]*bY,": {
                opcode: "text2speech_menu_languages",
                next: null,
                parent: null,
                inputs: {},
                fields: {
                    languages: ["en", null]
                },
                shadow: true,
                topLevel: true,
                x: 240,
                y: 773
            },
            "cIP1Pz|=R3i3!zzxV|+d": {
                opcode: "sensing_askandwait",
                next: ",T2k55ldMZoUjGmMjxAo",
                parent: "3ZfkT@:|Zcs{F(|dT%pL",
                inputs: {
                    QUESTION: [1, [10, "What laguage do you want your system to be?"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "0d/hd+^b#bUA5#?m3I)m": {
                opcode: "operator_contains",
                next: null,
                parent: "$w1(|$[S.e9^Qho4@g=I",
                inputs: {
                    "STRING1": [3, "9rSE%+=1Rr-$Bf#B0.MX", [10, "apple"]],
                    "STRING2": [1, [10, "Chinese (Mandarin)"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "9rSE%+=1Rr-$Bf#B0.MX": {
                opcode: "sensing_answer",
                next: null,
                parent: "0d/hd+^b#bUA5#?m3I)m",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "$G[.6OaYYQI_{}Y39Ksh": {
                opcode: "operator_contains",
                next: null,
                parent: "G(C)uOVRne_+#p~T;]dH",
                inputs: {
                    "STRING1": [3, "MHXyWi`@(OvL]X0t2$Q=", [10, "apple"]],
                    "STRING2": [1, [10, "English"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "x}FR}UVo[o.,JF(s|jU4": {
                opcode: "operator_contains",
                next: null,
                parent: "Jq%:V@GjlJ}H#dG%0!.0",
                inputs: {
                    "STRING1": [3, "UaG{-d3!i*G9l+v[6N}U", [10, "apple"]],
                    "STRING2": [1, [10, "French"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "IISq+$ru6w~x}!_YhG*.": {
                opcode: "operator_contains",
                next: null,
                parent: "G(C)uOVRne_+#p~T;]dH",
                inputs: {
                    "STRING1": [3, "1Y(@*(P+[q(j0..MA8-a", [10, "apple"]],
                    "STRING2": [1, [10, "Japanese"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "H7mj]FB[GIQyW@q?0}/x": {
                opcode: "operator_contains",
                next: null,
                parent: "Y=WISpW`5~TKkg(Y_Trl",
                inputs: {
                    "STRING1": [3, "M@-Nf_fILkcgDDRUVFR-", [10, "apple"]],
                    "STRING2": [1, [10, "Russian"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "%C6bZ15S}Qee#NPp=g:G": {
                opcode: "operator_contains",
                next: null,
                parent: "1ywTOaH=c(~|gO*y$2!%",
                inputs: {
                    "STRING1": [3, "/xp%@qR^{v0,2]RR|.Yy", [10, "apple"]],
                    "STRING2": [1, [10, "Spanish"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            ",T2k55ldMZoUjGmMjxAo": {
                opcode: "control_if_else",
                next: null,
                parent: "cIP1Pz|=R3i3!zzxV|+d",
                inputs: {
                    SUBSTACK: [2, "=V5k6Hu]xiyRn9=oyrmD"],
                    CONDITION: [2, "Jq%:V@GjlJ}H#dG%0!.0"],
                    "SUBSTACK2": [2, "2rqnetMH3EeHsEK-UETT"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "lC]bE(#,t+}==[yKC36i": {
                opcode: "sensing_answer",
                next: null,
                parent: "=H,YUt(Z5C2wpsl%i0Ih",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "2rqnetMH3EeHsEK-UETT": {
                opcode: "looks_say",
                next: null,
                parent: ",T2k55ldMZoUjGmMjxAo",
                inputs: {
                    MESSAGE: [1, [10, "Please Try Again."]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Ay^I%Ptq+WO-bd+~|*`z": {
                opcode: "operator_contains",
                next: null,
                parent: "_Wujq+:~cuq=Iuz!5)Nw",
                inputs: {
                    "STRING1": [3, "(XLf~EtY6MV1mG#asf6r", [10, "apple"]],
                    "STRING2": [1, [10, "German"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "UaG{-d3!i*G9l+v[6N}U": {
                opcode: "sensing_answer",
                next: null,
                parent: "x}FR}UVo[o.,JF(s|jU4",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "/xp%@qR^{v0,2]RR|.Yy": {
                opcode: "sensing_answer",
                next: null,
                parent: "%C6bZ15S}Qee#NPp=g:G",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "1Y(@*(P+[q(j0..MA8-a": {
                opcode: "sensing_answer",
                next: null,
                parent: "IISq+$ru6w~x}!_YhG*.",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "M@-Nf_fILkcgDDRUVFR-": {
                opcode: "sensing_answer",
                next: null,
                parent: "H7mj]FB[GIQyW@q?0}/x",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "MHXyWi`@(OvL]X0t2$Q=": {
                opcode: "sensing_answer",
                next: null,
                parent: "$G[.6OaYYQI_{}Y39Ksh",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "(XLf~EtY6MV1mG#asf6r": {
                opcode: "sensing_answer",
                next: null,
                parent: "Ay^I%Ptq+WO-bd+~|*`z",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Jq%:V@GjlJ}H#dG%0!.0": {
                opcode: "operator_or",
                next: null,
                parent: ",T2k55ldMZoUjGmMjxAo",
                inputs: {
                    "OPERAND2": [2, "$w1(|$[S.e9^Qho4@g=I"],
                    "OPERAND1": [2, "x}FR}UVo[o.,JF(s|jU4"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "$w1(|$[S.e9^Qho4@g=I": {
                opcode: "operator_or",
                next: null,
                parent: "Jq%:V@GjlJ}H#dG%0!.0",
                inputs: {
                    "OPERAND2": [2, "_Wujq+:~cuq=Iuz!5)Nw"],
                    "OPERAND1": [2, "0d/hd+^b#bUA5#?m3I)m"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "_Wujq+:~cuq=Iuz!5)Nw": {
                opcode: "operator_or",
                next: null,
                parent: "$w1(|$[S.e9^Qho4@g=I",
                inputs: {
                    "OPERAND2": [2, "Y=WISpW`5~TKkg(Y_Trl"],
                    "OPERAND1": [2, "Ay^I%Ptq+WO-bd+~|*`z"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Y=WISpW`5~TKkg(Y_Trl": {
                opcode: "operator_or",
                next: null,
                parent: "_Wujq+:~cuq=Iuz!5)Nw",
                inputs: {
                    "OPERAND2": [2, "1ywTOaH=c(~|gO*y$2!%"],
                    "OPERAND1": [2, "H7mj]FB[GIQyW@q?0}/x"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "1ywTOaH=c(~|gO*y$2!%": {
                opcode: "operator_or",
                next: null,
                parent: "Y=WISpW`5~TKkg(Y_Trl",
                inputs: {
                    "OPERAND2": [2, "G(C)uOVRne_+#p~T;]dH"],
                    "OPERAND1": [2, "%C6bZ15S}Qee#NPp=g:G"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "G(C)uOVRne_+#p~T;]dH": {
                opcode: "operator_or",
                next: null,
                parent: "1ywTOaH=c(~|gO*y$2!%",
                inputs: {
                    "OPERAND2": [2, "IISq+$ru6w~x}!_YhG*."],
                    "OPERAND1": [2, "$G[.6OaYYQI_{}Y39Ksh"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "=V5k6Hu]xiyRn9=oyrmD": {
                opcode: "data_setvariableto",
                next: "=H,YUt(Z5C2wpsl%i0Ih",
                parent: ",T2k55ldMZoUjGmMjxAo",
                inputs: {
                    VALUE: [3, "QpC9gNPWVuyikYj3#z*Q", [10, "0"]]
                },
                fields: {
                    VARIABLE: ["Language", "hPQ=v9XD?esnwtBlq}wA"]
                },
                shadow: false,
                topLevel: false
            },
            "QpC9gNPWVuyikYj3#z*Q": {
                opcode: "sensing_answer",
                next: null,
                parent: "=V5k6Hu]xiyRn9=oyrmD",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "B?`UiL`A2f~Gr1j4+n;c": {
                opcode: "looks_say",
                next: null,
                parent: "=H,YUt(Z5C2wpsl%i0Ih",
                inputs: {
                    MESSAGE: [3, "BwUOUqbvm~Dj.HO$ysjO", [10, "Please restart for chages to take effect."]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "BwUOUqbvm~Dj.HO$ysjO": {
                opcode: "translate_getTranslate",
                next: null,
                parent: "B?`UiL`A2f~Gr1j4+n;c",
                inputs: {
                    WORDS: [1, [10, "Please restart for chages to take effect."]],
                    LANGUAGE: [3, [12, "Language", "hPQ=v9XD?esnwtBlq}wA"], "KZDO;PRo1OSb}y5`52We"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "KZDO;PRo1OSb}y5`52We": {
                opcode: "translate_menu_languages",
                next: null,
                parent: null,
                inputs: {},
                fields: {
                    languages: ["mi", null]
                },
                shadow: true,
                topLevel: true,
                x: 730,
                y: 901
            },
            "$Q5QZIQmL[xk*%Z~=[KS": {
                opcode: "event_whenbroadcastreceived",
                next: "YTxFbL!$?4Io~^.6g|~Y",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeenter", "1U5]W!E-AQ{+|Kb%c.0="]
                },
                shadow: false,
                topLevel: true,
                x: 319,
                y: 1182
            },
            "YTxFbL!$?4Io~^.6g|~Y": {
                opcode: "looks_hide",
                next: null,
                parent: "$Q5QZIQmL[xk*%Z~=[KS",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "%*#^oy;UEUFTkaUj1-_N": {
                opcode: "event_whenbroadcastreceived",
                next: "e^jd_OOQ!@H[}UsxDUp|",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeexit", "f=+PCMVQjDs*mUgu*alt"]
                },
                shadow: false,
                topLevel: true,
                x: 627,
                y: 1180
            },
            "e^jd_OOQ!@H[}UsxDUp|": {
                opcode: "looks_show",
                next: null,
                parent: "%*#^oy;UEUFTkaUj1-_N",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "dd07fed2c637cc0f8b2563d89ae1e35a",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "dd07fed2c637cc0f8b2563d89ae1e35a.svg",
            dataFormat: "svg",
            rotationCenterX: 45.25,
            rotationCenterY: 49.75
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 6,
        visible: false,
        x: -174,
        y: 110,
        size: 100,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite6",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "V8$fw#y*6AGu:y~7%VMG": {
                opcode: "event_whenflagclicked",
                next: "Y4rSz@Wq9eS_9}?--HDS",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 211,
                y: 104
            },
            ",7s{i#h2UaI8Iv`bA^O+": {
                opcode: "event_whenbroadcastreceived",
                next: "fd}A[%Nu.al=}nv4or0*",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsclose", "g~aluGRSe@7SP/a`LH6s"]
                },
                shadow: false,
                topLevel: true,
                x: 81,
                y: 472
            },
            "{6J0M#_W2@e^u@?F/NjR": {
                opcode: "event_whenbroadcastreceived",
                next: "Wb|ds):ndL=95p9OG.zZ",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["settingsopen", "k]H_U=/1=t%+Cv^Y2Z]y"]
                },
                shadow: false,
                topLevel: true,
                x: 11,
                y: 577
            },
            "Y4rSz@Wq9eS_9}?--HDS": {
                opcode: "looks_hide",
                next: null,
                parent: "V8$fw#y*6AGu:y~7%VMG",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "fd}A[%Nu.al=}nv4or0*": {
                opcode: "looks_hide",
                next: null,
                parent: ",7s{i#h2UaI8Iv`bA^O+",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Wb|ds):ndL=95p9OG.zZ": {
                opcode: "looks_show",
                next: null,
                parent: "{6J0M#_W2@e^u@?F/NjR",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "=J)$s65N~1SUkhrL)j^W": {
                opcode: "event_whenthisspriteclicked",
                next: "4XwG.?9!NWe77CrUAF*n",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 427,
                y: 240
            },
            "4XwG.?9!NWe77CrUAF*n": {
                opcode: "looks_switchbackdropto",
                next: "~PzUzJz9WQcmqVJ14FQs",
                parent: "=J)$s65N~1SUkhrL)j^W",
                inputs: {
                    BACKDROP: [1, "G`EEFdrtG6?!iR{_+,xD"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "G`EEFdrtG6?!iR{_+,xD": {
                opcode: "looks_backdrops",
                next: null,
                parent: "4XwG.?9!NWe77CrUAF*n",
                inputs: {},
                fields: {
                    BACKDROP: ["backdrop4", null]
                },
                shadow: true,
                topLevel: false
            },
            "~PzUzJz9WQcmqVJ14FQs": {
                opcode: "event_broadcast",
                next: null,
                parent: "4XwG.?9!NWe77CrUAF*n",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "sleepmodeenter", "1U5]W!E-AQ{+|Kb%c.0="]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "j9kA/R;/ub{vo_]#r`x)": {
                opcode: "event_whenbroadcastreceived",
                next: "bk$+E$3,Wsm,6DR++p^~",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeenter", "1U5]W!E-AQ{+|Kb%c.0="]
                },
                shadow: false,
                topLevel: true,
                x: 1,
                y: 240
            },
            "bk$+E$3,Wsm,6DR++p^~": {
                opcode: "looks_hide",
                next: null,
                parent: "j9kA/R;/ub{vo_]#r`x)",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            ";mhF!DR`Nh`xLowf@j^r": {
                opcode: "event_whenbroadcastreceived",
                next: "aPLcn8,Rh]X_]dZ8I5,0",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeexit", "f=+PCMVQjDs*mUgu*alt"]
                },
                shadow: false,
                topLevel: true,
                x: 423,
                y: 474
            },
            "aPLcn8,Rh]X_]dZ8I5,0": {
                opcode: "looks_show",
                next: null,
                parent: ";mhF!DR`Nh`xLowf@j^r",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "0491e6302612ed5666be3df30a62d866",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "0491e6302612ed5666be3df30a62d866.svg",
            dataFormat: "svg",
            rotationCenterX: 47.25,
            rotationCenterY: 48.25
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 7,
        visible: false,
        x: 190,
        y: -131,
        size: 100,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite7",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "c~s!%76psH3*I6(`-([B": {
                opcode: "event_whenflagclicked",
                next: "!lq*@RfcEQWK~J~X]+bL",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 54,
                y: 201
            },
            "!lq*@RfcEQWK~J~X]+bL": {
                opcode: "looks_hide",
                next: null,
                parent: "c~s!%76psH3*I6(`-([B",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "0Gy)~iK:0oqMb_v_s;|^": {
                opcode: "event_whenbroadcastreceived",
                next: "T+XTmt8mAd(6k@;*kGLh",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeenter", "1U5]W!E-AQ{+|Kb%c.0="]
                },
                shadow: false,
                topLevel: true,
                x: 409,
                y: 351
            },
            "Lz:LS*Kn8g{UGT]Rl_Hf": {
                opcode: "event_whenbroadcastreceived",
                next: "hUM;x3B*%E/OYMfhBo$E",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["sleepmodeexit", "f=+PCMVQjDs*mUgu*alt"]
                },
                shadow: false,
                topLevel: true,
                x: 14,
                y: 468
            },
            "T+XTmt8mAd(6k@;*kGLh": {
                opcode: "looks_show",
                next: null,
                parent: "0Gy)~iK:0oqMb_v_s;|^",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "hUM;x3B*%E/OYMfhBo$E": {
                opcode: "looks_hide",
                next: null,
                parent: "Lz:LS*Kn8g{UGT]Rl_Hf",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "})m_G^:nC^9/{?.yvZev": {
                opcode: "event_whenthisspriteclicked",
                next: "-XEh1^!fYxu!OZ,re{xJ",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 340,
                y: 483
            },
            "-XEh1^!fYxu!OZ,re{xJ": {
                opcode: "event_broadcast",
                next: "l;,Jy3[NxPR:EwP1y5-t",
                parent: "})m_G^:nC^9/{?.yvZev",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "sleepmodeexit", "f=+PCMVQjDs*mUgu*alt"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "l;,Jy3[NxPR:EwP1y5-t": {
                opcode: "looks_switchbackdropto",
                next: null,
                parent: "-XEh1^!fYxu!OZ,re{xJ",
                inputs: {
                    BACKDROP: [1, "Tr?zO,5a(7t=2.l$:$%5"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Tr?zO,5a(7t=2.l$:$%5": {
                opcode: "looks_backdrops",
                next: null,
                parent: "l;,Jy3[NxPR:EwP1y5-t",
                inputs: {},
                fields: {
                    BACKDROP: ["backdrop1", null]
                },
                shadow: true,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "f101c225563b34fd0fc76c7067054ab4",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "f101c225563b34fd0fc76c7067054ab4.svg",
            dataFormat: "svg",
            rotationCenterX: 406.75,
            rotationCenterY: 233.25
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 8,
        visible: false,
        x: 36,
        y: 28,
        size: 100,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "catpop2",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "=jYysi$$]wym/*9eWImW": {
                opcode: "event_whenthisspriteclicked",
                next: "r,.4!`f!qLb;00+b~@ng",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 114,
                y: 259
            },
            "r,.4!`f!qLb;00+b~@ng": {
                opcode: "event_broadcast",
                next: null,
                parent: "=jYysi$$]wym/*9eWImW",
                inputs: {
                    BROADCAST_INPUT: [1, [11, "tacpopclick", "AiSce`%8F5Ypfh!h?C}U"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "-aBhJV%-@8mvKjDak+UJ": {
                opcode: "event_whenbroadcastreceived",
                next: "s/@)/879#?AWHMew!)D_",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopclose", "?o3cwOtQ-$/x$B6`L__v"]
                },
                shadow: false,
                topLevel: true,
                x: 81,
                y: 510
            },
            "s/@)/879#?AWHMew!)D_": {
                opcode: "looks_hide",
                next: null,
                parent: "-aBhJV%-@8mvKjDak+UJ",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "rzSf/vki_M7JLb^Im*`T": {
                opcode: "event_whenbroadcastreceived",
                next: "Fo#Ptu`!EdD_o3:twJya",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopopen", "DSi=nMh(K+k[Ri,diV5M"]
                },
                shadow: false,
                topLevel: true,
                x: 98,
                y: 651
            },
            "Fo#Ptu`!EdD_o3:twJya": {
                opcode: "looks_show",
                next: null,
                parent: "rzSf/vki_M7JLb^Im*`T",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "U0)Ofg-GO^^*T7umnAyK": {
                opcode: "event_whenflagclicked",
                next: "ol)/5$d`/d3)70UzLacj",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 336,
                y: 142
            },
            "ol)/5$d`/d3)70UzLacj": {
                opcode: "looks_hide",
                next: "XKXt9H(X$AY@gi7cs_Wq",
                parent: "U0)Ofg-GO^^*T7umnAyK",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "wz$7e$mvs|B,aHoTL{zp": {
                opcode: "event_whenbroadcastreceived",
                next: ",g`Yx7}.9H2u54rs-?!W",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopclick", "AiSce`%8F5Ypfh!h?C}U"]
                },
                shadow: false,
                topLevel: true,
                x: 419,
                y: 257
            },
            ",g`Yx7}.9H2u54rs-?!W": {
                opcode: "data_changevariableby",
                next: "-NR/SljtI3l7}-k9e5Z|",
                parent: "wz$7e$mvs|B,aHoTL{zp",
                inputs: {
                    VALUE: [1, [4, "1"]]
                },
                fields: {
                    VARIABLE: ["tacpops", "c)(I)nb-:k6QF0fJ_M]X"]
                },
                shadow: false,
                topLevel: false
            },
            "-NR/SljtI3l7}-k9e5Z|": {
                opcode: "looks_changesizeby",
                next: "0FP[-Y/Spm@v^OP~U?vb",
                parent: ",g`Yx7}.9H2u54rs-?!W",
                inputs: {
                    CHANGE: [1, [4, "5"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "0FP[-Y/Spm@v^OP~U?vb": {
                opcode: "control_wait",
                next: "AIfA=YeU#=${f5fv4IQl",
                parent: "-NR/SljtI3l7}-k9e5Z|",
                inputs: {
                    DURATION: [1, [5, "0.01"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "AIfA=YeU#=${f5fv4IQl": {
                opcode: "looks_changesizeby",
                next: "JFSddj_6m!3g/;?-zhXp",
                parent: "0FP[-Y/Spm@v^OP~U?vb",
                inputs: {
                    CHANGE: [1, [4, "5"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "JFSddj_6m!3g/;?-zhXp": {
                opcode: "control_wait",
                next: "G^fVByq$N?|+~(gmmT9#",
                parent: "AIfA=YeU#=${f5fv4IQl",
                inputs: {
                    DURATION: [1, [5, "0.01"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "G^fVByq$N?|+~(gmmT9#": {
                opcode: "looks_changesizeby",
                next: "$JDu?N4PiJk?lhN,YOz?",
                parent: "JFSddj_6m!3g/;?-zhXp",
                inputs: {
                    CHANGE: [1, [4, "-5"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "$JDu?N4PiJk?lhN,YOz?": {
                opcode: "control_wait",
                next: "tH@S!65VjWw~4r7tT!A/",
                parent: "G^fVByq$N?|+~(gmmT9#",
                inputs: {
                    DURATION: [1, [5, "0.01"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "tH@S!65VjWw~4r7tT!A/": {
                opcode: "looks_changesizeby",
                next: null,
                parent: "$JDu?N4PiJk?lhN,YOz?",
                inputs: {
                    CHANGE: [1, [4, "-5"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "XKXt9H(X$AY@gi7cs_Wq": {
                opcode: "data_hidevariable",
                next: null,
                parent: "ol)/5$d`/d3)70UzLacj",
                inputs: {},
                fields: {
                    VARIABLE: ["tacpops", "c)(I)nb-:k6QF0fJ_M]X"]
                },
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "d43f8c50047e22ea685863b67cecd2cc",
            name: "catpop",
            bitmapResolution: 2,
            "md5ext": "d43f8c50047e22ea685863b67cecd2cc.jpg",
            dataFormat: "jpg",
            rotationCenterX: 360,
            rotationCenterY: 360
        }],
        sounds: [],
        volume: 100,
        layerOrder: 10,
        visible: false,
        x: 1,
        y: 0,
        size: 99.99999999999999,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite8",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {},
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "46d7010e89ce8ea2ab55eff5ac4d7805",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "46d7010e89ce8ea2ab55eff5ac4d7805.svg",
            dataFormat: "svg",
            rotationCenterX: 227.75,
            rotationCenterY: -4.75
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 9,
        visible: true,
        x: 36,
        y: 28,
        size: 100,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }, {
        isStage: false,
        name: "Sprite9",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {
            "NJu[6su^z%uFL(}$:w[h": {
                opcode: "event_whenthisspriteclicked",
                next: "_,`A9)3Ff+/6/3ADZsDV",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 33,
                y: 75
            },
            "_,`A9)3Ff+/6/3ADZsDV": {
                opcode: "sensing_askandwait",
                next: "3G=HZAyY4f5qaa!(W),T",
                parent: "NJu[6su^z%uFL(}$:w[h",
                inputs: {
                    QUESTION: [1, [10, "Are you sure ?"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "r.T(5Ad9^uyXDd@5t4K,": {
                opcode: "operator_equals",
                next: null,
                parent: "3G=HZAyY4f5qaa!(W),T",
                inputs: {
                    "OPERAND1": [3, "tSw%~pA+-C%EYb4|UJsM", [10, ""]],
                    "OPERAND2": [1, [10, "Yes"]]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "3G=HZAyY4f5qaa!(W),T": {
                opcode: "control_if",
                next: null,
                parent: "_,`A9)3Ff+/6/3ADZsDV",
                inputs: {
                    CONDITION: [2, "r.T(5Ad9^uyXDd@5t4K,"],
                    SUBSTACK: [2, "Cj1GD|rCw=g9dmM81-CY"]
                },
                fields: {},
                shadow: false,
                topLevel: false
            },
            "tSw%~pA+-C%EYb4|UJsM": {
                opcode: "sensing_answer",
                next: null,
                parent: "r.T(5Ad9^uyXDd@5t4K,",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "Cj1GD|rCw=g9dmM81-CY": {
                opcode: "data_setvariableto",
                next: null,
                parent: "3G=HZAyY4f5qaa!(W),T",
                inputs: {
                    VALUE: [1, [10, "0"]]
                },
                fields: {
                    VARIABLE: ["tacpops", "c)(I)nb-:k6QF0fJ_M]X"]
                },
                shadow: false,
                topLevel: false
            },
            "h[2@u7Wh3G#%E3)^cuWa": {
                opcode: "event_whenflagclicked",
                next: "N_@cl#rXe/j/1/|%@Gqb",
                parent: null,
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: true,
                x: 392,
                y: 154
            },
            "[A[~UbbAK:@N7Gmh)u9J": {
                opcode: "event_whenbroadcastreceived",
                next: "X%+2go-a^.zT-07.6eXG",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopclose", "?o3cwOtQ-$/x$B6`L__v"]
                },
                shadow: false,
                topLevel: true,
                x: 341,
                y: 500
            },
            "7hg==K)EJ3OK_H7w^mk2": {
                opcode: "event_whenbroadcastreceived",
                next: "`6F)fWJ}vfgVp?Y6,.x7",
                parent: null,
                inputs: {},
                fields: {
                    BROADCAST_OPTION: ["tacpopopen", "DSi=nMh(K+k[Ri,diV5M"]
                },
                shadow: false,
                topLevel: true,
                x: 33,
                y: 514
            },
            "N_@cl#rXe/j/1/|%@Gqb": {
                opcode: "looks_hide",
                next: null,
                parent: "h[2@u7Wh3G#%E3)^cuWa",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "`6F)fWJ}vfgVp?Y6,.x7": {
                opcode: "looks_show",
                next: null,
                parent: "7hg==K)EJ3OK_H7w^mk2",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            },
            "X%+2go-a^.zT-07.6eXG": {
                opcode: "looks_hide",
                next: null,
                parent: "[A[~UbbAK:@N7Gmh)u9J",
                inputs: {},
                fields: {},
                shadow: false,
                topLevel: false
            }
        },
        comments: {},
        currentCostume: 0,
        costumes: [{
            assetId: "4410d8eee550ec4a3ed27bd52503ea82",
            name: "costume1",
            bitmapResolution: 1,
            "md5ext": "4410d8eee550ec4a3ed27bd52503ea82.svg",
            dataFormat: "svg",
            rotationCenterX: 207.75,
            rotationCenterY: 144.75
        }],
        sounds: [{
            assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
            name: "pop",
            dataFormat: "wav",
            format: "",
            rate: 48000,
            sampleCount: 1123,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }],
        volume: 100,
        layerOrder: 11,
        visible: false,
        x: 36,
        y: 28,
        size: 100,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
    }],
    monitors: [{
        id: "ji@7ecIRX_H2iywO/rpC",
        mode: "default",
        opcode: "data_variable",
        params: {
            VARIABLE: "settingsopen?"
        },
        spriteName: null,
        value: 0,
        width: 0,
        height: 0,
        x: 5,
        y: 5,
        visible: false,
        sliderMin: 0,
        sliderMax: 100,
        isDiscrete: true
    }, {
        id: "KXoOu7!+D^Mvl-pzWEnv",
        mode: "default",
        opcode: "data_variable",
        params: {
            VARIABLE: "catshopopen?"
        },
        spriteName: null,
        value: 0,
        width: 0,
        height: 0,
        x: 5,
        y: 5,
        visible: false,
        sliderMin: 0,
        sliderMax: 100,
        isDiscrete: true
    }, {
        id: "ZsA6=PlKI@kskL5e^bFo",
        mode: "default",
        opcode: "data_variable",
        params: {
            VARIABLE: "tacpopopen?"
        },
        spriteName: null,
        value: 0,
        width: 0,
        height: 0,
        x: 5,
        y: 33,
        visible: false,
        sliderMin: 0,
        sliderMax: 100,
        isDiscrete: true
    }, {
        id: "hPQ=v9XD?esnwtBlq}wA",
        mode: "default",
        opcode: "data_variable",
        params: {
            VARIABLE: "Language"
        },
        spriteName: null,
        value: 0,
        width: 0,
        height: 0,
        x: 5,
        y: 5,
        visible: false,
        sliderMin: 0,
        sliderMax: 100,
        isDiscrete: true
    }, {
        id: "c)(I)nb-:k6QF0fJ_M]X",
        mode: "default",
        opcode: "data_variable",
        params: {
            VARIABLE: "tacpops"
        },
        spriteName: null,
        value: 781,
        width: 0,
        height: 0,
        x: 183,
        y: 1,
        visible: false,
        sliderMin: 0,
        sliderMax: 100,
        isDiscrete: true
    }],
    extensions: ["videoSensing", "text2speech", "translate"],
    meta: {
        semver: "3.0.0",
        vm: "0.2.0",
        agent: "Mozilla/5.0 (X11; CrOS x86_64 14150.57.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.97 Safari/537.36"
    }
}
  return this.write(`M0 \n`);
}

}

module.exports = CatOS;

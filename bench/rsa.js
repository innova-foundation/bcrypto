'use strict';

const assert = require('bsert');
const bench = require('./bench');
const rsa = require('../lib/rsa');
const SHA256 = require('../lib/sha256');
const mul = rsa.native ? 10 : 1;

// 2048
const raw = Buffer.from('308204a50201000282010100c4c393497ecadd3dac9c46e4'
                      + 'ab2604cbfe467957a8d56cee4d6be26fd9e6232c613d099d'
                      + 'c4a0b95bd4379e463bbe62fa26f23c1873782f7b21d0009d'
                      + 'f950b8e7b10602c80ed0da555c8a4b1c59490e750327e964'
                      + '454d13fc6a64cfbcc73f83c6330b3a77d7f773af363af3e7'
                      + 'cb0931c0bdcc0930070a4939e75496e7c4d38a30f4e316d1'
                      + '6d623ec654d6f795635194bb299854961d8978479740b647'
                      + 'dedacb919b22f9870f2aeff0bb6959f7d7a0b106eda31bbe'
                      + '4b1870bbe17972a71d049d06345051c2b10f22675ec80070'
                      + '718b32c2616fc1937509752cfe2163c0499c10762b255173'
                      + '811adb85877a43c54afb95a94e6fdd428e0543d8687d3a3d'
                      + '8b0fc3bb02030100010282010100b7a65765a4ab51fe4b8a'
                      + '7d7cd6e5a05a8a155b125f69fcc71b8a138a145602045d29'
                      + 'ec3cce16b98b2533584df35b4ae472cf6b19e3448d049f55'
                      + '960ddc72e472943ea8fff31c2a7cbbe7f41d1c94dca28874'
                      + '8b1964b9816afa1ee7ea2a0a7542dbc7a225d3748a0c4250'
                      + '99f082082de0d9058499c828689a5bf90ef47a387b647a65'
                      + 'd6a653c047e431e6cacfedbadb27d2182f4195a303fd61bc'
                      + 'f84de891061d17a80e8afda8589c80d2061ab6b3f7cf7ade'
                      + '44211cbe1aa12e32b0707fcde090b3cc38930c2be69b4c27'
                      + 'd693c72c738977f6ebdec862de95ea6e672abeda817ef311'
                      + '25883cf3981db6eb8b77e5c802879a192786aa2a6a5e8793'
                      + '27894f761be902818100c71e567b648da7a9a118c585397a'
                      + '071236c73402c423cb50d0776bcc5d70774e8bf913f8e1ca'
                      + 'd71e8dadd7a6a7a3392350747aed17fba35190ade3e56827'
                      + '53be5e5f851e3535b687d56dc18bb6d4e97332217e4e2f58'
                      + '4bb3df216e86a9fb29e9676d44c193661b61753b310e6661'
                      + '0addd70298d951ebbff20deac4186c73dbf702818100fcf9'
                      + '0c677c1b7118bc48ebd011f55906649910e6292717c33673'
                      + 'ce2d23bb488c1b7e0f0ad6b9a0d4730933b9ca93d452fa34'
                      + 'bd0d7a83988e533d63f23b65dcb4151d8ca476c3bc27d80d'
                      + 'a2455a36f25d18139e06bb99df346c1373213b8823d17605'
                      + '8c18d7cc30efe85f83bb5eb9dee7a7a72ebdc2453285301d'
                      + '864069293d5d0281810097fd2f5446dfddf01c58d544a927'
                      + 'dd47e8ea4b682521916b61851692cb6c32959140921f32f2'
                      + 'eb1b9657f13973d2a2a5b31f0649fe398563984533a503c8'
                      + 'a922b1d4c5bed62ce6e46e64b60d188512a16ccda624b5fc'
                      + 'f6e418d8e30e05a80348f73aaff5f6b64506323ef9661d7d'
                      + 'cb96a42d8650b43878aea232e676222a99e702818100c19c'
                      + '2260395e0f4aed1faa4b0ed386151c7d01b005a303cec628'
                      + '0f8e00a0dfbf4b734933f46f11a6477cad77ee9101999821'
                      + '30e7d5f24d99f01f3615385c9773c40d5f8ca7d0da7a6c22'
                      + 'd324dd0cdca55f3df45e16ca8747e9c760fff83e139bc606'
                      + '2cd8fea02a7c128eb79579c42bd3843eb1c94d9c04346744'
                      + 'd1710e8b1f8902818008a1224bde11a44657f428d5a493cd'
                      + '50ee22afed0f4408daef3a3f2ba966be9bdf8c0ab4feb4ff'
                      + '6dd61e445de203e35bf57779cf8c532646d1d44c9d32f4c0'
                      + '54fa07966d298a6dd73539c6b56986e89909c51dcac940d6'
                      + '2ed487b308be44a489a21d5985fa766a86456e101abe044e'
                      + 'bd236104806eb079ac6f4c46384c5ad971', 'hex');

// 4096
// eslint-disable-next-line
const big = Buffer.from('308209290201000282020100cc8846dbd34e6c746cd54dc5'
                      + '7c7a19486038fdc0ac4f2cd92ab8c2bbec50d5d746de8a0f'
                      + 'ce2e964449016be71f45b75112d4a81f37a5f7cf188d0294'
                      + '2a61334aaac3f4a9c1778a2b90a25ffeb1501bec551f4210'
                      + 'aa0ebfbd9bf2a8f2e5f183eae99a875a4f7a299a70f7c3ab'
                      + 'eaa8fd21740c49b5b2be715203aa121b6eb13946d9b2c375'
                      + 'a4005c1af5159d19c570d50befe5116dea2f5e2edb0667ba'
                      + '337ed77c3be1db1f9710e087d8d227c95abfc562bec06463'
                      + '6d497589d465655b722bf667e7d3125de9893aa92341d8f3'
                      + '171290668fe2178607734536c389de22147efee324b81a14'
                      + '78d019a52e325e42f5e38711b080faf90270638d32b5ffb4'
                      + '43879dba9c8d6457bb51fdcb1a3b921fdd6e1792562db112'
                      + 'b1fa8dee3983d3191bd4a661b456f11130535ba617fa084a'
                      + 'c473ca7328271ee931bc6010f0825407c5a52a8a14e72f2d'
                      + 'db9d83749d91fcf9140c63ac278b3751af0fa7a547dcbecb'
                      + '3c119d6d6ae77972036afe03af2c30b243915e6e37b783c9'
                      + 'b48867a8e3d437edf7b3260077f1b1fb21f9f4852cbd0c38'
                      + 'c3753eff4efa4b595e19188492208f81f40a0ff891174a19'
                      + '7b5a3537776087cb121a91f3e046112e37bbb6cdca7350d4'
                      + 'c2165728319985ecffefd10259eb9b56ffe2a03be6a0250b'
                      + '0e56c77ec7bf48835119256f3705a65fa0eb55d603947625'
                      + '8b4fcc204da31cba46e9e2b22aca49faea33559d02030100'
                      + '01028202002e0d310725d8ae8ab8467eb04c8aa14eae7ba6'
                      + '86cf45346fe132a085f77b6bea80c672878480f0cc87338e'
                      + 'bc074a872ff5f173b933aa66d5764da99afabfcff0abea5b'
                      + '182dbb609cd67ff8e53bbf31ca50902d2bdb5e5ec5ae6b40'
                      + 'a7102704f0cb9043918dfb8f8a7a8d0ebd92a461fa3a4ad9'
                      + 'fdd3351606c55471a743911bb85c23e7e680faa3c25e1473'
                      + 'beedb9adfe7611398f69ff28519c7720bbc804733841b364'
                      + 'c7041884b591981fe5324da37fcc3b3d5f35a82892d403d0'
                      + '827a7e738889a5f8a8b4807578c7bb77c1a41c45ef11ce72'
                      + '45773ff9018f9d672a7d3aeae0f1cf91efb21408f22c28a3'
                      + '18a88c8648f158d9295fe73643007c020af0798485ac82f2'
                      + 'd5ead8b0eba42e63e75dc32fdcbe71eebb5ff2b147ea92a5'
                      + '2d118df332e722ee0f776894f2e5585b215ef2d0548a52e0'
                      + 'ad400a9f7870a2e7ba0d748b96f330329a095fa94de2f9db'
                      + 'e4864376658092f7da4f71e89fc2cb78cb9320521757317e'
                      + '28e8397ccb5e4952a1da3ded870ff9116892604e41e5c9be'
                      + '8fcd85dcea11de5b3bb5f974e0dc9c19ce1b3fccf8debf5e'
                      + '7f6ad6a1d6f99503e865609662c46448fda297d295226aa7'
                      + '4357bbacaf3df802ae2aade49c5ad0660aa773917fc3d105'
                      + '76e8cb2a143a46864259888a47b5f87b6960d3732ee882cd'
                      + 'fc289c46eeb8580de0903338054d307ac5cd877888599eb8'
                      + 'f6867565db03ed2fc025df9f810282010100d34508337f13'
                      + '0dfe909cf08870f286efd0799ceb8803c5d2bacf15d6056d'
                      + '3a7c1656f96a31b42bbc217d428ac2a254ef011e5fbfdb8f'
                      + '199460b67ea2ea349f606c8af1c1b79a640773f2694b4b1b'
                      + '40cb1f4bb9c9ee37348315cb48c8d9fd52cec76fa293c269'
                      + '54e9255339db8f5873ad4af0322638ee8dda1b5a01c840ea'
                      + '7138895024fd0f811b254638e0000950484eb168dd1a5c5d'
                      + '832a3e0194ed51c9ee7f22eb4264b575237b62f8ef6cb432'
                      + '5a701015ae5b99b8ac91ce82eb48e2b5ecb8a85cd58b76bc'
                      + 'e59a6321546000daf08c24232f4f29260886d77675e870d7'
                      + '1442cc288a61874c2679f9c4658a1a5099efa182f766af96'
                      + '56b226d521d71f6a2c850282010100f7d613ad786f9645e4'
                      + '2541cb948c89e799a495467bf41f91e2de6186b364c578c3'
                      + 'b81f4e12d0a8f2e00427a31a3e01914aa4e7689ce4a0707c'
                      + '2b2d3b6856397e33dc2c97070b7920c0d72eaac375bd5630'
                      + '8f029bd21f0615935fbf07a8963f85b40a083c739fa80c42'
                      + '49ec951c2e3bedddfebdefc0909c3738f944c34f4952b9ef'
                      + '74d74778bda3d4990de1838466310a35bf8e9b008478bbe8'
                      + 'a0a7364d92290cb57526233040b867f47c860379e3f9fad9'
                      + '9203a4cae8e3e395914f5b334e7ec7b70642bcc0789cb8df'
                      + '7eb23c2fe759e8cc68889ca9c603f9e311d17178a49ddb07'
                      + '70f3df0b5482f8d9e6221fe983c66c099e0dc7a163d97032'
                      + '72f9f7f9b37c39028201002c4056526af873c2f1495dfc46'
                      + '24166d5eae4a56ef1b53312b5dbac62446d7ac2c05b5a22f'
                      + '9cfc58206f9b2373570b11309bcb14658998a3028ad7058a'
                      + 'a6d10722550c04364fc949e2585103ab4c9f0aac9870e6c1'
                      + 'd5a053209a7eb94b278b53b264489a486b4594bbf3adb7b6'
                      + '53a18f17962dfae18bddfc64243b2155af855d812d5f41fe'
                      + '205dae36022db0f4427392c00825dfa29f179d1e75b85ae8'
                      + 'f9b1d1c15fa37d72a0817913a6ee87474b10b44e3a2c5615'
                      + '61a00bbe449fc19972df8d61fe67e01953c187cfe1a8499f'
                      + '843c442e418c64394b3518014357b9030199c5cffb61d8c1'
                      + 'bd0a861bf1ae0efa2a0dc42a81430ea8128640347009f184'
                      + '2bf9fd0282010100f48bd570d724ec57dc8df2c549b7ff1f'
                      + '7b588e3f357226709236b26ef2b6ddaf93182c33a297280e'
                      + '378382050b90e18516ed6eb5a81264497a0c349ea90e63be'
                      + 'a6b77b7c2ee4604a345e5fdaf9f144b93642f6e50049c27c'
                      + '29a6515de2391746fbe6e647982392f33db9a9eb5c1a36e2'
                      + '38a9f38b0e2ce3280e5cd040140d1ac70383fc24b6fc111b'
                      + '6746ee1e12d7af4e0ec90c92dfc8d7453b7ec25fefdce80a'
                      + '7546ba32009bec1a0f818bcf044832d3163a60c40bc00f95'
                      + 'f270a6a82c11294231d3c8a86d16d63609b9ff6f2a29936b'
                      + '05bfa40549f46cd9f6f80efd7378a3968b5a26191119fbfe'
                      + '472c30c1e26e37ad4534230eb7ae49d0cec6eae6880a55e9'
                      + '0282010100ab4eb8b03bcc8ad84c0b7bef5300c58a8b5139'
                      + 'b0b8fb20bed5555c81d1a56cac15741c8615a49a1208eaa6'
                      + 'eaa3d4dcbc2de8a3f9f36c40280b1e2ea3e1749870863bb4'
                      + '08c7c47ae1a78cef3aa18782bcf34da8a77927c9c47a8d11'
                      + '3a502c60a5428242bfe154205ad16b78ede2067e1d6ef0f6'
                      + '3a3500fbbc680b34e88d9dcf169c125820b4fa6d4e40ce0c'
                      + '9193fcc4121bdf303cc8e10f7fd0a8aeddc291f1e7ed08bd'
                      + '6ee91c231ff250bf1d333073630704ee081a43d4da992100'
                      + '146c3bce132591a07eaf9c31c40a1fdbc33616dca7833aaa'
                      + 'cb802796f327044494f020119cf1a771391ec15feb94307d'
                      + 'dec075297a0967252551cc20e4846bb592258dbf8e', 'hex');

{
  const rounds = 1000 * mul;
  const key = raw;
  const pub = rsa.publicKeyCreate(key);
  const msg = Buffer.from('31260986ee940fa71d2c4cc7c00d4b1e'
                        + 'c2131b24f2b6243f48c2cbd3b7b82ea3', 'hex');
  const sig = rsa.sign(SHA256, msg, key);

  assert(rsa.privateKeyVerify(key));
  assert(rsa.verify(SHA256, msg, sig, pub));

  bench('rsa verify (pkcs1v1.5)', rounds, () => {
    rsa.verify(SHA256, msg, sig, pub);
  });
}

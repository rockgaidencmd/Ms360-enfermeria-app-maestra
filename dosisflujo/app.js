/* ====================================================
   MEDISHORT360 - CALCULO DE DOSIS EN mL  v2
   ==================================================== */

const LOGO_B64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCAC0ALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD4AoopQCWAAyTQAlSw29xcybLeF5G9FGa17TR4oUWbUQSx5W3U4/76Pb6VoG4YJ5cQWGMdEjG0VpGm3uZyqJbGQnh+/YfvTDB/10kGfyFS/wDCPMAM6jaA/U/4Vd9+9Jnmr9miPaMpDw/z/wAhO1/8e/wpf+Ef/wCona/+Pf4VbzjvTWkVVyzAD1NHs0HtGVDoOP8AmJWx/wC+v8KT+wv+ojbf+Pf4V3nhP4S/E/x4qv4S8Da3qcDdLlbcxQf9/X2p+teyeH/2GPjRq6K+q3fhrQ1PVJ71riQf8BiUj/x6uepWoU3aUkaxhVlqkfL/APYgz/yEbb8m/wAKT+xB/wBBG2/8e/wr7btP+CeetCMHU/ilZxHuLbSHYD8XkH8qnk/4J8oUxb/FotJ6NpCkfpNmsHjsMvtfg/8AI0VCs9kfDo0MZ/5CNv8A+Pf4U4aDn/mJW3/j3+FfX2rfsDeNrWNn0nx9od5jot1ZT2+fxG8V5j4j/ZU+N/hwPInheHWoU6vo92k5/wC+Dtf9KqGNws3ZTX5fmDw9dK/KeI/8I+P+gpa/+Pf4Uf8ACPjvqdr/AOPf4VqanpuqaHqLafremXum3a9be8gaFx/wFgDVUMDXYoRaujnc5LRlX/hHvTU7T/x7/Cmt4enz+6vbST23kfzFXs8UlP2aF7RmRcaRqNspaS1Yp/eT5h+lUfrXURzSwtmORkPsabcRWd/kXUawynpPEMf99DvUun2KVTucz0oFWb2xmsZ/LmAIPKuvKsPUVWrI1CijiigA/GtzSbRba3GoTKDK3+pU9v8Aa/wrKs4PtV9Fbj+NgD9O9dBNIHm+QAIvyqB2A6VpTjd3M6kraCFizFmJJPUmjjvSUVsYi5FRtIFBOfxq3pum6lrms2+kaPZS3l7cNsigiGWY/wBAOpJ4A5NfUvgv4afD74J+HYfHXxOvba+1kfNbW4USqjgZ228Z/wBY47yNgL1+XqeTFYyGHWusnsluzqw2EnXemiW7PPfhZ+y94/8AiMYNS1Qf8IzokuGW4vIi1xMvrFDwcf7TlR6Zr3KJP2Uf2eFImih8W+Jrc4Z3CX86OPVjiCE57D5h718/fFj9qXxn458/R9DmfQ9CbKm2tZCHnH/TaUYL/wC6ML7HrXgks09zJumkZz2z0H09K872WIxOtaXKuy/U7uajR92krvuz7G8X/t9eKpy1r4I8N6ZpEC/Kk1yDeSgdvvbUX8FNeKeIf2oPjf4id/tnxA1qON/+WVrcfZkH/AYQgrW+Bnh/w9eS+Hry901Jp7zXJbOeeTazKkccLqqBgVGfMfJxngcio/izaT6ne61oOkWhu5LTXFFpbwJ5swRkkV8EDcQSI8jpnFejTylU6Ht1Fct7eZxPMITrvDXfPa+2lvW97/I4fUb74q3vh0eJtSHiKXS5CQuoXPnPE5GM4dyQcbh+Y9at+HPDnxB8Q+FL7xJpepW6WtkFaQS3IjkYNJ5Y2jHPz8dRXp+qR6/o3wJs/CnjaIadNqV1JNp0M0gZ3BtxHOeMhVUmNuvb2qn8MtP1WL4EeLIBaOJbaSwSUnGEBunY5PpyufwrzK1adKL5oWafXt3Pr8DktDE1oKFZzg4ttxa0lde7177Hmfh/4i/FS2vjD4a8Q+IhcIC5SwuZ9ygdThG6D6V6L4f/AGu/jV4bu/s2p622qLE22S31e3SYgjqCcK4P/Aqr/CeAfDjStc8YeINMV7iyQxra3CB0lnOVihbsQDukZec7Ury3xrq82s66huUhN3ApS4mQYLuWLFSc8hM7QfY9sVaVGvNw5E0up5uIwFbB4aFec7Sl9m2ttf8AK59c6T+1n8NviHp40P4s+Brfy3G0yxxi8hHv5cn7xPqhY1n+Jv2afAHjjRJfEvwV8WWyIefsbzGe2z/dyf3sJ9mB/CvjExt9a6Hwr458UeDNci1XQNXurK5j4EkUhUkf3T2Yf7JBHtU/UpUXzYWfL5dDheJjU93ERv59TX8UeE/EvgnXW0fxRpM+n3XJTzBlJV/vRuPlce4P1xWOHBNfUnhT43+C/jD4dHgz4o6dYwXcuFS6dfLgkfoGz1gk9GU7T/s9K8l+K/wb1b4dXkmoWLy6joBbAuCP3lsT0WUDt2Djg98Hg9eGx/NL2Vdcs/wfp/kcuIwXLH2lJ3j+KPNSRTTyOKaDmndq9I88cPLntzZ3P+rb7rd0b1FYE8EltcvBIMMhwa2zVbVV820hu+rqfKf37g1nUj1NKctbGT+FFHFFYmxp6IuLqaf/AJ5wkj6nir6nAqlo5xb3rf7Cj9atg4rensYVNyWpLOzvNT1SDTtOt5Lm7uJBFFDGMl2PQf8A1+1Vi+FJNe9/C3w7p3gXwbcfELxQmLmSHMMJ4eONvuouejyd/RfxrDF4lYeHNu3svM2wuHdefL06nTaDZeGP2ffh6+uausN/4jvY8AZwZCOqKeqwqcZbqx9yAPmnxx498QePvEs2q6zePMz/ACqg+VUQdEVRwqjso+pyeaf4/wDHGq+PPFs+qX8uUJ2xxqTsRB91VHZR2/EnkmuchgPpXBh6DhetV1mz0Zy9palSVoojSEnqp/Kplhwfun8qsRxEA4B6etSbNuSc4781tKodVLBpK7R7L8H7S8/4RXw41vE+5/EtyylRzhbaAHH4mvWfGfib4f8AwX1O6v7PRoNX8aXhaR5LjEkdruO4DHc+x4+tcL4P1P8A4RWXQ9KjAB0bSRdMD1+1XI+0SH6hWiT6JXjeuXl54v8AHzteTSO07mSZycttB6fieK+tpYlYPLoze+58HUwE8yzd0obaL1OjvvGfj74zePrGO/gvfEF2JttpFGcJbknkLxhUx1HA4HTFfUkXiLwJ8IvDFzo7iHU9QuIwl1BEQIAQT8rY+9XAadeWHwr+DXm6bDFFq+pR7PMUcxx+oPavm/xL4mvNT1B3eZ5AzEDnJY18FiK9XM63M1sft2CwWG4Xwcqc5X5rOy0u1572T89XqeweMPH/AIb8RadJp0FmljA0qzrHG2UV1+620/xdvcV5p418P6ZLZxeLtCOLe6m8q+tf+fW5ILfL/wBM3AYr6EMvpWZ4d8EeLvFOopbabp1wWYgfLGzkZ9hX0b4W/Z7tfDXhyef4l61a2FldKjS29/dGPcFbcP3MR3kgjrvHf1r1MHw/ioWdNaeeh8vnXHGX41OOJS5ls1q/R+T8/XofKRgGDkDp3qB4OOBn6V9lp41/Zq8DbYtO8M2uuSJwzjTIEDH/AH5hI5/OvnT4k+IofGPi/VfENrpFpp1k16EsorSBIUSBkJWP5FUMV2/exnJOa6sTgKuGjzTa+R4OEzTD4+fs6cGvNo85HmwTCSNmVh0I7V9D/B742RSWcfgjx5KtxpsiGCC5uPnECnjY+fvRHoQfu/7vA8Dliz2zVVlkhlWRCVZTkEdq8+tRhiI8sjrtPDS5o7HsXxe+F8ngbWDqmkIz6DcvhRnd9lc8hCe6H+FvwPOCfNVY4r3X4R+ObXxn4Qm+HvicJcN5JitvN/5aJjmLP4ZT0xjsteSeMPDFz4O8XXGkTs0sP+stpyP9bETwfqOh9wavA4iTboVviX4o5MZh4pKtS+F/gzFPSo5F36ddR+ihx9QafuoT7k49YX/lXovY4FuYP5UUY9qK5jpNbRyBaXv+6n86s54qrpJ/0O9/3U/mamZhtJreGxhU3Ox+HHhgeKPG0KTxGSxtMTTr2c5+RPxPX2Bra+OHjl9S1VPC+nyj7JZ5EhQ8SSdGb3/uj2B/vV0fhkJ4C+DM+sTHy7y5j83OPmV3X5f++UGfrXgM08l9fS3cx+eRtx749q8lP6xiHUfwx0R6yg6NFU1vLViRRZHOKuJEBgHFOsoRJMi9STjGK9L+NvhPTfBvxjvtB0qBYLWK3tHSNckZe1idjk/7TNVVKvvWPXweBvSdTt/wP80ecxxrsb7vT1962vCvhbVfF/iy20LRrNrmeU7pMMFWKIffkdjwiqMksf5kCsqKJpJBFErySOQqoi5LEngAdya95Sxi8D+Hh8PtNK/2rcos/iO+RvvOORaqw58uPoQPvPuPYY56tZU1c9TB4CWKmqcPm+3/AAX0+/ZMy/El3YaRPquo6ddreG9voBc6iYvlMTOwYRAj5IhsjjBPzN1OAQo8r8OO0niKe6ONqyKhc8BQDn+eK+kfDWg2+paWYryxSXeOVmRfLKnj5lPBH+xg9BXkfxF8CX/h74nzWGiWzR2Btl1C1tGYZZT8rlEUcYdXAVucY5OaulmDxFB4Z77mmYcPRyjHU8fFLldlZLrrq382WPiZrbXFpZ26nCx24woPt3964jwH4buvE3jWGGCIuiyxxZwSNzHp+hNX2tNQ8VySwFhYi0MUMzXStkNI20AKBndgMdvopr6O+BvhnSNA1q0mtrNZzawm8UXT+WEB4M85AJ3uRhUXPyqeeCT7PD2BakpzXur8X2PkuPM7Va8KctWvu8z0zWtU0P4G/DKCy0yCJdclhy9wyDMQI+7g18T+OPiBrfizWp72/wBRmaPdguzFjn+6o9a9L+PnjmfxF4kuisnVtoVWJGfT361wHw48Cf8ACZeKZ1mbFhpkZeViQBkDLtkn14/AV7Oe5i8JDlT1erf6HynB+QPM6ydr9Ff83+f4HKaRpup6xdiKw0u4dieJGh87+ZCiuq8W+Bn8PeGdKl1PxcLi9ulmmg0gQIBCigF2YxyMqMfQgE7e3FJ43iubfVBZafM1vapk4TOFUDJOB14Fc9Gka+F31IR/aCS0UTzzsHTcAHZUCAMMEfxcEg818aq9Stad9H0/4LP0/EZbh8BzYdxbmra7LdX0X5vS9jFkjGf4eg71XmiwO351ewpYfN2HavQ/iD4R03Rvg78O9etLdIrnV7K7lunGcuyXbopP/AAtWqnK0jnng/aU5TXT+v0PLdN1C50bWoNQtJGjlicMGQ4Iwc8H14yPcV9BeMIIPiX8JLfxFZojalbKZQsY/jAHmJ9GXDAeuB6187zoO1esfA/xE0epXPhmeXEd0u6LPZxkrj3zkf8AAhSxUWkq8N4niUklJ0ZbSPNlbKDFSRH5Zv8Ari/8q2/HGjDQfHd5aRqBbyn7RCB0CtklfwO4fgKw4sFZv+uL/wAq9aE1UgprqePODhNxfQw+PWij8aKxNjT0r/jzvP8AdT+ZrV0Ox/tXxPYacRlJplD/AO4OW/QGsrS+LO8P+yv8zXb/AAusvtnjd5sf6iA7eP4mIUfpmitU9nRlPsFKn7StGJ0Hxo1VoNL03QImwGHmuB74P8gv5mvIoI/l6Hp6133xBtNV8S/FK7g0uxu70W+IwtvE0uPyB7Ypum/C7x5c3EUUfg7W2aRgq/6BKMknHXbXmUZxpUUr67n0VDA1cTWclHTYyfCWnf2h4w0qxCE/aLyKLGf7zgf1r0/9ouRL74uLqy5b7ZZRybs9lLRf+0639L+FtvoXxf8AB+oeHJrnV9Fj1CKO9vxFmOK5hmCzruXICkqGQk5KutUPEfhHxD8Q7Lw3caFZreXMXh6a8mjDAMyx3s6kID99iWUBRyewrllWTqJn2VHLZU8JKHW6/r8Djfg/ZW//AAnc/iO6TNv4etH1PDDcDMCEgGP+ujq3/AK6bwuk2o39zfzO0k8rGZ3Y5ON3X/e5AH4ms7wvYaj4W+HPjGPWNNurG4nuLGForiFonEY82QnawBwSF9qb4e1y10iDfdTJDGGLSO7DGzGce5GM4HWs696k5cvSy/U6sncMLSjOrpdtv0Wi/X7z26wv9K0bRvtN9qMNg0T73u53ATJBC5bJAU/nn3xXiem+Jb7xL8UNV8VW1zIYJJvsmnSakvmLFECXWNRwDjltvAUZZ2AHzYOueJtS8euk2o7rLRrSFZzp8UgMlw24KG2jplnCgtwASeea2tK05pRHPeQiO3CeSILMMEt4yysUVeSQ2MMTlm3c8cV6eCw0MEuevu+h8vnmZV8/q+ywX8OD1l0XS/nbe3Rfc+rvbWbWHGpeHtBv9V0m2kxFf386RRyTuNgnaLaTIWPyqXxGilQI8Zz0GiW8un6VrNhqXifUtO1xXLT2ISMyyt0DzSglpOmAYyq4wFAIKj3H4c6LoepfDm9tdVhW5sriPEqQgxSRLjIfcMHIIByMEEDrivEvHwOpobrUpILy6gkkjW4li8uW52uVzL6FwquGHBIyMEc6YXPZ02qlSK5f5VpZGOY8F0a8pYXDzbqWupuz5pLf0vfS363PCPGV8bjVdytJ5Ydn8nf5gGOQVbJzk8fjXuHwV+GM1n4Xmubi5Ms8zLNPI0CmOBlkYKI23HzAXHzHbglSMEAk+L3Wiy6lripHCZJIUabYAAZNuAqMT1LOY1z/ALVb3gn4har8L7qR4bq8vNAuYmS3mVcm1bzCWTP8JzkNj144PPtYbF4fEVlVqRvF7XWl/wAj4vMcux2W0pYalNxqJ62bu15Pc6XV/DlifiNaJhUmmn2GJuIrjdlWUg48tiG4x8pPpnNeCrc3sCz6U8KRKsmxwYgsgKnG0k8jkDI9q9K8d+N49V1Q31lcb1VwEljbOccgg/rVHxP4c1zxP8UtXvdC0K/vvPaK4m+yWryhZZIUeTO0HB3Mx/GuDNaVHD4l+ztaSv5Kz/4J7mS18TmGCp+1bcoSs77tNaX/APATjI0BkXKnHHRq9w+MUAPwJ8AQgE/2fAIDg9POtre4/wDahNZ0HwguE+HM13PFfR+KlT7dHoxtjvNiriJ5Sv3g29gQMfcR2rrPiRps2reD7vw/YRedcWesaVZRRjqWfTRFj8WhFeDOsnJM++oZbKFGonu1+O36nzJMgI4B796m8O6jLo/i6xvonKFJV5/H/HBr2zR/gmNPn1LTviAk+l31xcHSdF2SKIp7wgsJC5yHgG1VLKcZmQg4BryPXvBXinRS76l4d1WzCHkz2kkePzUV3068J3gz4/McqrUUqqV/Q9F+MdnHc2Gna7AoxuAJH9yRdw/Jh+teWQHKzf8AXF/5V65qpGufASK4PLrabh9UIf8AlxXkFucrL/1xf+VbZbL904Po2jwMwivaqS6ox+fSijtRXQYGjpv/AB43n0T+Zr1L4Lxg6jqM3ffEufQDca8s07/jxvPov8zXrHwSIa4v0PXzk/VTWGPf+zP+upvgl/tC/rocDrmrX1v4+1Sa1u54G+0EZikK9OOx9qtReMvEflFDr2pkEYINy+MfnWJ4nDR+N9VHcXUn/oVblp8NviFc2UN1B4T1J4po1ljfYBuRgCDyehBBrJ04cqbsenhcxq0ZOMW92a3hP4g+JPCF5LcaFqUsBmhlgkQjcjLJGUbKnjODweoIBHIFeq3WoPY/sjWOsW8jLPNL/ZAkBwV23Ml0cHsfuV47H8NfiJnA8JaifoF/+Krs7rSfild/B/T/AACPA2oi3s9Tn1Pzhty7SxRx7SM9B5ZOf9o1x1KEG1Zo+kwefOMJKbd7abnL6J4iu7jw14lsLu5luGkSG6HmsWY7Cynqf9tT+Fc/pqS6trFpFes/kPKBHDn5VPQMQfcgfjW5afCr4nR3oceDtUEUgMcgCryh6/xfj9RWhH8MPiaZiyeCdUUbNg+VPlG4n+97120PZ0pSqXTen+R89i8XPF04UJSaiua79btfiyDTpbez0a1t5IIh56FZ2Aw6bWUq3uQ2WOeoIGRxXZeFtWsorzyLtAsZymCMGNscMR3AOOlYcnw5+Jlwp/4oXV1l8wuJNq/vM8Hd83Xgcjriren/AA8+J1tKufBOr4BA6JkY9DurHMIe1tZ3stP69bv5ns8OZnSwl1L3bt3T28rP/DZfLufROmeMG0zw55a3RBk/eGdc5Yn+FsdTn2757c+R+J/EFzqE8j/Zv3QBVlcqiIgY/wAWSBhieApPsKhk8NfE2a2W3bwjrAgQY+6in/0Ks658EfEqeVHm8FazKqKAkMKRxqAOmSzH9B79c15dLDT6q59ZjM7we9Ory/4bf8Er6PqEWn3o1m+t0t9N02WO6Zd3mS3TKHdEbgBQGEbBFHUjcSQMUNX0zTtF0C2t4LgzlIF8/wAthtuAB/rU7ElcFW5BB2sCACL1x4E+Jr3avD4I1WK2hkSSOL5XLMGy7MS3zMxVOwG1RgCoLvwB8SXVYYvBWriJRhU2oQoLE/KC3y9ccduDXtaKlCnF2a18rt2t91n958PKvRqYmtia3vxk1FJv3kkrqSe27atputdDgLrSdKg1xPOkf7Oz7TJZqEI4+95bcA4OccAjoRS6vea5oHjnU7c6tMJTN5gmtZWRJEYBkYAHoVK4HbpXQT/DH4pSXW9/BWreYwAdiqHIHQk7uvaotc+GHxKvdWSePwdqjqltDDuKLyVQA96iTjKXvPocsK0aVPmpaWa206P+v6sZdn4q1uz16DWoNTuxfwsrx3BkJcEYxyTntXt/wv8AEN34qvfFvinXZFmura/t/E1yyIEXMInYkKOFG51GBwMgV4v/AMKt+JagZ8GamOOpVf8A4qur8Kab8U/CPh/xRp1r4G1CRde0s6ZJIcDylM0cpYc8nEe3/gRrlq0ItaNHvYPPuWX7x6fM891bW9QvZVN1eXEoTIRXckKOuBk8D6Vmajr+sXsRjutVvZl/uyTsw/Imuhk+GfxFlc48IaiTn+6P8a5jXdB1rw7qK2Ou6bcWFw8YlWOdcFkJIDD1GQR+Brso04KyVj5/MMzq1nJ3evqev+DSb34FmNjnb50XPYFSP6V4/aHMT/8AXFv5V7B8PgY/gozno08h/Abq8esvuScf8sW/lVYD+JVXmeXjdYU35GXRS0V1HKaGnf8AHjefRf5mvSvgrciPxNf27NjcsUuPXDEH+debacf9Du/ov8zXT/Di+Fj8R7VWOBcI8Oc45IyP1FZ4uHNhpI0wsuXERN+TTbC2+LnjO+1DTLe//suyl1C3t7nJiaUPEq71BG5RvPy9DxnI4rofg78OtM+OnxA8Qp4v1zVINRjgW+N1apG3m5cIykMOMZXGOAAR6VX8VQiLxv4wul4W68MtJ9SZYc/59q6b9kq5Nv8AEzxCwbBfS0Uf9/1rgnVlHCyqxeqSt+B2RpqWIjTls2zlfH/wWg8JftEaV8ONNubi8t9VezFrdTRqJCsz7HJC8fKQ/wCAFd18cf2cvBPwl+Fh8V2Guazqk7X0VpHBPFAiENuJYlVznahx7kV7Xq2g2fiv44fD74g222SDTILxZGPrtHk/k7SflXJftTa9Brn7L1pdWz7optTtpYznPylJcf41yU8xq1KlGCf+L1u/8jeeBpwhUlb09NP8yldfso/BjSvDena34h+JuoaLa38cbwvf/ZIgWeMSbAWAyQD29K5DTv2fPhnq/wC0ZafD7SfGd7qOjXegNq8Or2f2aXMiyMrIdoKlcL9QetexfFL4dXPxb+CfhXQrXWbPTDYC3uzJcozq3+ihNvy8jls/hXjfwE8NJ4A/bR1Hwx9u+2/2bY3cBuVQxiQ+XGchcnAy3rRQxlSVGc/a+8k9LL5PYVXCwjUhDk0bWt/+CdrN+x98MdSv9R0Hw18VGk1+xH76ynht5mgPGPOSMh1HI5964L4N/s6aF48+IXjHwR4vvtQ0fVvDkkaObBIZY3zI0Z++M9VBBHUNXYeD7pYv+Cl3iy4VsLJFdBueo8iI8/jXefCS9WL9tP4wygqA/wBh7dfumnLG16cJJzv7qknZaXaFHCUpyi1G3vNdTxv4U/s5eGPH/iDxdqmq6zcaT4Q8O6hPYid0iFxceWSWZmI2RqqgMzYP3gB0Jq/8SP2cvhvZfBW7+Jnwo8Xtr2l2OXuFuDHKsiBwjGN0VSGUsCVZeRnB6Z3PgV4/8KNq3xD+D/i25W1TXtXv3tpHfy1uBKWikhD/AMMnygrnrn1wD578S/B3xW+DPha68GWHiq7ufh5qUz48mNVR2fGY5xjKOQg77Wxx3A6Y168sTyOdtrJ7NdfmYSoUo0edRvvd9U+nyNHxd8B/Afh/9lTTPi7ZanrM91qUFm0OnzxQCON5zg7mC5Krhsdzx71Hb/AnwLP+x3J8aDqWsreR2byHTvKg8szLP5GN23ds3YPrj3r2yDwZc/Ev9hnwZ4PtNVttNlexsbgXFyhdR5ZLYwvPOaoeNPDM3gD/AIJ/634In1O31B7O0YtcQIUR996snAbnjdj8K51mMtIc/vc9v+3fuNXgYq8+XTlv8zgPBv7NHw9g+Edj4/8Ai54vbQLTUI0mgghMUCxJJzGHd1Ys7D5tqjgeuDjlvjJ8AdA+HEeh+JdD1efWfCep3UVu8oWMzwh/mUq6jY6sm4q2ByORgg13/wC0xcJcfsyeALQnKpPaEqDxxYMBVfx3erL+wX4IgLbmQaUee2CwqqeLrNwquWkpNWsrIJ4WklKmo6xinc0NY/ZI+E2kaha2F/8AEnULG6vZGis4rpbVGuHGMhAcbjyOB6ivPG/Zx0PQvjVP4U8Y+Kks9CbSX1S01iNYoN4WVI9kglJVWBfnBOflI61698d/BPiH4h+LPBUujC3EGl38k11PNME8pC0RBAPLH5G4HtXk37XOt2Gr+N9B02GZXubO1nlnjVs+WJJFKKffCE49x61ng8XXrShD2l3JO+i922xpisNSpKUnC3K1bfW50eofswfCuw0iLVpviHfR6fKqtHdyNarE4b7u18YOe3PNeN32n2iXXi/wHcmPUtN8Ow3txpV4+BPCUdRw6HBR924ryM8jGa9R+JE4l/Yi8L22QQsGm8f8Ab/GvDfBeFg8TKM4/wCEfuv/AEKOunCOrUpzqVJ3s7Lbo9zHEqnCpGEI2ur/AHnoGj40v9nWCU/KWgnmz9Rx/OvGrMfJJ7Qt/KvWvGl2um/Bew01DtZ4Ioce7fOR+Qryi14WX/rk/wDKuzL1dTn3ZzY92cIdkZPOOtFJ+FFdJzmlpv8Ax53n0X+dLFcSWOoQX0JxJBIsi/UHNJpv/HnefRf50SLuQ1tFXjZmUnaV0etaxfxapBrF/C25ZPDcpB9VM0LD8smr37OEkieONbMfU2UfA/67CvOPCviKysYp7DW7a6uNPmtZLKdrVwssUTujb03AglSvQ+tdXolh8R/A2sX0ngmzi1K0vUQxaitukgnh++hXcflzuGV7EY7V5FSjajOheze1z1I1b1YVui3PZ/DHj2XT/gj4nvfOLTaJdajAGJ5B8xnjHtzKAPpXMfFG4ml/Y58ORO+QsWnE57nyG5rzObS/ixPpWuad/wAI9cR2mt3AuryKKBFBkDbvl5+UE9QOOBWlrFx8ZNe8Hx+GNR8Lo2lxCIRwpZRps8vAXBBz0GPcE1zwwahUU018V9/L/O5rLEuUHFp7W28z1/43aN4h8WfBnwzZeHtNvtRuIZ4JXitELsifZiuTjtkgVxXwP8PeJvCnx7sz4ktLm0u7rR7qVEunzMVBVAWGSV+7gA9gKqp49/aJSNUj0RFRQAqrp0OAB0ArN/4SL47N4xTxQdB3alHZmxSQ2MW1Yi+84XOMk9+uOKVOjVjRlQvGzv17jnVpyqxrWldW6dj1nw34Z8SW/wC2T4k8Y3GlXEWkNFKI711wkzPHGgCf3jkNnHTFaXwt1ZJv2p/infW0u9S9pGWBzkp8rfqpFeRXnjT9o7ULF7b7JdWqOCDJaWcUbgHrhhyPqKw/B5+MvgSS9fw14fmjlvtpuJbi1jld9uSOWPHLE/WoeDnOEuaUb8qitezRSxMISjyxdrtvTudVoXwj0Xx/4b8c+IWu9UfWrHV7+K0srRowkjrmSMHcpOWZiOCOlejabfeKLz9irxBafEqC7W9t7O5SJ9RUrM6RhTAz7udwcAAnk4FeKaDL8cfDPijUNf0TQ7u2n1ORpby3Fsht5WJJz5ecDknpjGTVrxhrHx18c6Z/ZOuaPdQ6exDPa2UCRLKRyN3zZbB5wTitqtCrUmk5LlTTTvqrdEZ06tOEW1F3aatbR+Z6N45u5n/YJ8OQB2UC307BU4I+aobO8f8A4d53Fs7M3+hSjJOT/wAf3evPNQvvjfqvgOPwZe+Fw2jxxRQxwpYRq0ax4KFWByDx1+vrTEvPjWnw9/4QePwuP7E8g23kfYYy20ksTuznduO7PrSWFfIldX5+bfoDrrmbs/h5dup6j8XbLVvF/wCz34Ufw7Yz6n5BtLgxWqmRyhtimQo5OCQDjpWf8RBPov7LHhjQNUHkXkUmnQNCTkh1yzL9RzmuB8Lap8dfBulrpWlaHdzWKEmK3vbdZBFnk7TnI57ZxWX4kj+MXizWbXUtf0O8uDZuHt7byEWBCCD9wHBzgZzyaVPCyTjByXLFt76jnXi1KaT5pJLY+ifGvji+0H4peDLc3jx2GpXF3ZXEO7CuzKgiYj1VyMf7xr56+O+hHSfi3d6kqERavGLwHsJPuyD/AL6Gf+BU7xTc/GXxitmNc8PyM9lP9ot5YLRInjfjoQenA49hVfxY3xb8Z20EHiLw28v2d2eKSGzSN1LDBG4HoeCR6gVeCw/1ecJcy2aevndE4qt7eMo2e6a08tTtvHVwzfsnaDD/AArBp3/oFeUeDDn/AISQZ66DdA/99R10WqXfxa1bwinhi+8ND+zUjjiSOOyRGQR424YHIIx1+tZqWdt4I8OTDU47mTX9YsZIfsgKrHY2zNjfIeSZGKZCjAA65J43oR9nSlBtNt30MqrdSrGaVkl1K3xC1Y3c2m6apGIohM4HqRhf0B/OuXthhZf+uT/yqG4upNQ1Ka8lPzSNkD0HQD8sVNADiXH/ADyb+Velh6Xs6SicGIqe0qcxkYoo/GioKNDTf+PO8/3V/nT8ZFM03P2e7X/YB/I0/tW9PYwnuRLI9rdpcIobb1U9GHcGuztfAn9vaAb7Qpi8zKZYkLffx96P2Yent9K491DKa3/BXiyXwvq/lzu32CZgXx1ibtIPp39vcCubF05256e6OrC1IX5J7M5aT7TBM0MpljkQlWRiQVI7VJIl1FHHL5rmKQZVwxwfUfWvcPGngS18d6WfEPhryf7dSPfNbx4C36AZ3p2347d/5eLWdybKWWyvrd3gZts0DfKyMOMjPRh/9Y1jRrRqx5orVbo6XQUJ8lR2T2fT5+Xftv5OsrzZz58n/fRqTzJ8c3M3/fZq1c2ctg0V7aTedbFg0Nyg6EHOGH8LD0NdcPjD8QiSf7cjJPXNrH/hW7d0nTin+H6GE6UqUnCq2n9/67dn1OIBdjzcSn/gZr2vwZ4V+A+kfBu28cfFPxdreqanf3b29v4Z8NXcK3FtGpI82fzMkZ2kjoMFepPHm3iDxz4o8VafDZa5qKXEEMnmoqwIhDYIzlRnoTXpvwz8CePNK8L6Z8VfhXPpPiPVGeWyu9IeySaSyzkEusp2t0UgjkBgR3wp6RvJJP8ArrYmGsrRd1/XQ0/ib+zxp+kfFXwFoPw51zULyx8cwJPYRat8lxZglS3m7QMqFbd0B+VhyRmtvxN8Mv2aPDGp6z4F1Dxf4+tdY0qJopvFkluJNM+2qufIMSIWHJxjPHI3ZHPZ+M/EmgeG/wBoT4R+OPGctrp3jF42j8QxRTmSK3DQ+WjkFiI1V5G5HBAY84yex07WPipF8evFDeOPsS/CFra5k23CQfYmhZQVYY5Zzli5brz/ALNcntnZN9v1/E6PZas+d/hv8JfAcHwIv/jP8W9Y19NCS8/s/TtL0N1W4vZc7Sxd8gLkMAOPuMSegND4x/Cjwz4c8B+GPid8Nte1e/8AB/iIGNIdTYfabKcbsxuVwGB2OOnBQ9QQa7bTof8AhaX7Ev8AwgfgRWvNU0DXnul0veFmkt2lldGAYjPyTfmjDrisv4uTN4K/ZF8CfCXWJIl8RJdtqd1aLIHa1QmZgGxwCTMF99rYzitYzvO3W9reRm42j8t/M+cy8oHFzL/32aaZLjH/AB8zf99mu6Hxg+ISgBdbhGBjAs4v/iawtf8AF/ibxg9tDrN79sMLN5KRwqnLYzwoGTwK3jzX96KS9f8AgGXu/Zk2/T/gnPl7ksFWaVieANx5pbj7TbTGKSd94+8A5+U+lacnlaJGV3LJqZ4yDlbb/F/5fWtDwR4G1LxrrLrG32fT4PnvL6T7sS+gPdj2FQ5xSc3pE6Z0HTtTes3uu3k/Pv2663tH4V8K6n4lkluC0qWFvzNOScE9kHqxqDX7aHSLh9Jt2zKSGnOc7R1Cf1P4V6v4z8T6P4N8MwaB4dgWPYpW3hbliehmk9T/APq9a8T/AHs8zzzO0krsWd2OSSepNZYVyry52rR6CxHLRjyby6ixLhatQ/8ALX/rk/8AKoQMDFSxcRzse0Tfyr0nseatzI5ooNFcx0F3S3AvGiJ/1qFPx6ipuc1nRu0UqyKfmU5Fa022RVuY/uSc8fwnuK2pvoZVF1I+oqGRARUwNIRWhmmdH4M8cXfhi7jt7iSVrINuRkPzQHPVfb1H4j39U17wp4c+KWnpqVlc2ml+IXUbLwEC2v8A0EmPuv23fn6V4JJGpFaOg+JdU8N3O6zfzLdjl7d/ut7j0PuPxzXm4jBvm9rRdpHo4fFrl9nV1RJqOm+I/A+vz6TrNhJaT9Jba4XdHMvr6MPQioRaWGpc6bKLa4PW0nbAJ/2HPB+hwa9u0T4ieGPGmgJoHijToNWtscWt0dlxbn1hkHI/Dj2FYGt/AyPUfMvPhxrkepLgt/ZOossN0nsrfck/SsIYtc1qnuS/B/1/TO7lahy29pT7dV6Pp+XdM8juLe4tJzBdQSQyDqrqQafY6lqGmTtNpuoXdlIwwz20zREj0JUitTUYvFPha5Ok+IdMubfYcfZdSgJX/gO7+amqD3GjXEbFtPuLSXBwbeXehP8AutyB+NdyqNrVXXdf1/mccsNRetKpZ9paP71dP529CzY6Nreu3AvU0/UL+OSULNchWkycjdluecGvQfHvhKe00CxsfDf9uXtv5jCS1NzJcRooA2nZ0HNcx4P8dt4d05dK/sz7R5lxv83zduN2B0wemK7zxZ4zPh+0tpEtPtXmuyY37NpAz6HNeRi6+KjiYRjHTWyvufe5HlOSVsorVa9X3rR5nyu9N36aa32drnjkcuoaRqbNBNdWF5ETGxjdopEPcEjBFQzXE1xcvcXM0k0znLyyuWZj7k8mrlxf2Opa9e6lqEVyi3EjSrFAykgk9Cx/wpf7Yt7XjTdLt4H7TTfvpPwzwPyr2FOWnu6nwX1ajzN+1XJd20bbXe233tDbfSLmaAXVwyWdp/z8T/KD/ujqx+lLJqdtYRNBo6urMNr3kgxIw9FH8A/Wul0D4afEHxxJ9vTTp4rT+LUtTbyIUHszdR7KK9L0bwN8PfAUQ1DUriLxNqsXzebcDy7KAjuFPLkercVyVsTCPxu77L9f6+R10k4q2Gjy/wB57/Lt8tf71jz/AMDfCfUfEcKa54glfR9AHPnyDEtz/sxKeuf73T612njDxvovhLQYvD3h20itoYlzBZRnJJ/56St3P+R3Nc742+Lt1qlw8Oly+fJjYLllxHGPSNen6Y+vWvMCZbi4ee4leWVzuZ3OST6k1MMPVxMuetpHsc869PDLlpay7jrm5utRv5L29maWeQ5Zj/L2HtSoMLQFwKf9a9aMVFWR5UpOTuxKV28vTZ3/AL2EH9aMZYBRknoKg1CQBktVORHyxHdjSm7IcFdlLiijB7UVzm4Z+tW7K7EBaKUF4H+8o6g+oqpRxTTsDVzXki2ASIwkib7rjpUdU7e7mtSdhyrdUYZB/Cri3NlMPm3W7/8AfS1tGae5hKDWwHFMZAe1TiHeMxTROPZxS/Zpv7n6iruTqiiYyrhkJVgcgg4xXT6P4/8AEGkMqTuL6FTkCYkOPow/rmsY2sx/g/UUw2kx/wCWf6isqtGFVWmjalXnTd4s9t0f47QXNgNO1dkmtj8ptdWt1uovoCQcfpV42nwZ8T/vZ/CFrbSMOZdC1Bof/IZJUV4CbGU/8s/1FMNhMDlUIPqCK4Hlqi70pNHasw5tKkUz3Sb4UfCe4bfba/4rsM8hJIoZwPxGDUDfCj4cs2bnx34knQdB9hTP4ZY14zHJrUAxBfXcY9FmI/rUhvPELLg6nfEf9dz/AI1P1TEX/iFrFULW5D22L4efBzTV8yceJtVIGcT3Edsv47QTVn/hNvht4PJPh3w14d02ZOk7qb64H/Anzg/hXgMsOoz/AOvlml/35N38zTV0+UH/AFf6in/Z85/xKjZP12Ef4cEeneJfjVqGrSEQ/abxhwsl2+EX6IP/AK1ec6lrGra1Lv1G8eRc5EY4QfhUa2Uw48v9RThaSg/6v9RXXRwlKl8KOWti6lTdlZIgO1ShQKm+zTdfL/UUfZ5R1Cr9WArqOV3Ij1owScKCSe1Pb7PH/rrpB7J8xqCTUQqlbOMpngyNy3/1qlzSGoNks0ws0IGDcEcDrs/+vWXyTk9aOSck8n1o/GsZSubxjYOPSijiipGGKM0UUAJmiiigAozRRQAvU0d6KKAEyaMmiigAyaKKKADJpcmiigBMmiiigAyaM0UUAFLRRQAZ5oPWiigAxRRRQB//2Q==";

const UNIT_TO_MG = { mg:1, g:1000, mcg:0.001, U:1, mEq:1 };
const UNITS = ["mg","g","mcg","U","mEq"];

const PRESETS = [
  { label:"Paracetamol IV",  tipo:"liquido", contenido:1000, contUnit:"mg", volumen:100 },
  { label:"Tramadol",        tipo:"liquido", contenido:100,  contUnit:"mg", volumen:2   },
  { label:"Metamizol (1g)",  tipo:"liquido", contenido:1,    contUnit:"g",  volumen:2   },
  { label:"Gentamicina 80",  tipo:"liquido", contenido:80,   contUnit:"mg", volumen:2   },
  { label:"Ranitidina",      tipo:"liquido", contenido:50,   contUnit:"mg", volumen:2   },
  { label:"Ceftriaxona 1g",  tipo:"polvo",   contenido:1,    contUnit:"g",  volumen:""  },
  { label:"Ampicilina 1g",   tipo:"polvo",   contenido:1,    contUnit:"g",  volumen:""  },
  { label:"Amikacina 500",   tipo:"liquido", contenido:500,  contUnit:"mg", volumen:2   },
];

let state = {
  pestana: "dosis",          // "dosis" | "goteo"
  drugName:"", dosis:"", dosisUnit:"mg",
  tipo:"liquido",
  contenido:"", contenidoUnit:"mg", volumen:"",
  polvoContenido:"", polvoContenidoUnit:"g", polvoDisolvente:"",
  // Goteo IV
  goteoModo: "tiempo",       // "tiempo" | "flujo"
  goteoVol: "", goteoFlujo: "",
  goteoHoras: "", goteoMinutos: "",
  goteoFactor: "20",
  goteoInicio: "",
  installPrompt:null,
};

function setState(patch){ state={...state,...patch}; render(); }
function el(id){ return document.getElementById(id); }

function toMg(v,u){ return parseFloat(v||0)*(UNIT_TO_MG[u]||1); }

function fmt(n){
  if(n===null||n===undefined||isNaN(n)) return "—";
  if(n>=100) return n.toFixed(1);
  return n.toFixed(2);
}

function generarResultados(res, bl, blt, cy){
  if(!res) return "";
  
  const vialedFull = Math.floor(res.viales);
  const pct = Math.min(res.viales*100, 100);
  
  const pasos = (()=>{
    const drug = state.drugName || "el medicamento"; 
    const s = [];
    if(state.tipo === "liquido")
      s.push(`El vial contiene <strong>${state.contenido} ${state.contenidoUnit}</strong> en <strong>${state.volumen} mL</strong>.`);
    else
      s.push(`Frasco de polvo: <strong>${state.polvoContenido} ${state.polvoContenidoUnit}</strong> disuelto en <strong>${state.polvoDisolvente} mL</strong>.`);
    s.push(`La prescripcion indica <strong>${state.dosis} ${state.dosisUnit}</strong> de ${drug}.`);
    if(res.viales > 1) s.push(`Necesitas <strong>${Math.ceil(res.viales)} viales</strong>. Usa ${fmt(res.mlAdmin)} mL en total.`);
    s.push(`Administra <strong style="color:${cy}">${fmt(res.mlAdmin)} mL</strong> por via IV segun indicacion.`);
    return s;
  })();

  return `
    <!-- ERROR O AVISO -->
    ${(!res && (state.dosis || state.contenido || state.polvoContenido)) ? `
      <div class="error-box">⚠️ Completa todos los campos para calcular.</div>
    ` : ""}

    <!-- AVISO MULTIVIAL -->
    ${res && res.viales > 1 ? `
      <div class="warn-box">
        ⚠️ La dosis supera <strong>1 vial</strong>.
        Necesitas <strong>${res.viales.toFixed(2)} viales</strong>. Verifica la orden medica.
      </div>
    ` : ""}

    <!-- RESULTADO -->
    <div class="result-card" style="border-color:${blt}66;box-shadow:0 0 28px ${bl}28">
      <div class="result-header">
        <div class="card-label">Regla de Tres</div>
        <div class="r3-box">
          <div class="r3-title">Proporcion del vial</div>
          <div class="r3-row dim">
            <span class="r3-label">Si</span>
            <span class="r3-amt">${fmt(res.contMg)} mg</span>
            <span class="r3-dash">────</span>
            <span class="r3-vol">${fmt(res.volMl)} mL</span>
          </div>
          <hr class="r3-sep"/>
          <div class="r3-row bright">
            <span class="r3-label" style="color:${cy}">X</span>
            <span class="r3-amt" style="color:${cy}">${fmt(res.dosisMg)} mg</span>
            <span class="r3-dash" style="color:${blt}">────</span>
            <span class="r3-vol" style="color:${cy}">? mL</span>
          </div>
          <div class="r3-formula">
            X = (${fmt(res.dosisMg)} &times; ${fmt(res.volMl)}) &divide; ${fmt(res.contMg)}
            <br>= <strong>${fmt(res.mlAdmin)} mL</strong>
          </div>
        </div>
      </div>

      <div class="result-body">
        <!-- NUMERO GRANDE -->
        <div class="res-main">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:var(--muted);margin-bottom:10px">
            Administrar
          </div>
          <div class="res-num" style="color:${cy};text-shadow:0 0 22px ${cy}55">
            ${fmt(res.mlAdmin)} <span class="res-unit" style="color:${blt}">mL</span>
          </div>
          <div class="res-desc">
            ${state.dosis} ${state.dosisUnit}
            ${state.drugName ? "de " + state.drugName : ""}
          </div>
        </div>

        <!-- BARRA -->
        <div class="bar-txt">${fmt(res.mlAdmin)} mL de ${fmt(res.volMl)} mL del vial</div>
        <div class="bar-wrap">
          <div class="bar-fill" style="width:${pct.toFixed(1)}%;
            background:linear-gradient(90deg,${bl},${cy})"></div>
        </div>

        ${res.viales > 1 ? `
          <div class="vial-warn">
            <span class="vial-warn-icon">🏥</span>
            <div class="vial-warn-text">
              Necesitas <strong>${Math.ceil(res.viales)} viales</strong>.
              Usa en total ${fmt(res.mlAdmin)} mL.
            </div>
          </div>
        ` : ""}
      </div>
    </div>

    <!-- PASOS -->
    <div class="steps-card"
      style="border-color:${blt};background:linear-gradient(135deg,#0b1a30,#040c1f);
             box-shadow:0 0 24px ${bl}33">
      <div class="steps-title" style="color:${blt}">
        <span>🩺</span> Procedimiento paso a paso
      </div>
      <div class="steps-list">
        ${pasos.map((p, i) => `
          <div class="step-row">
            <div class="step-num"
              style="background:linear-gradient(135deg,${bl},${cy});
                     box-shadow:0 0 8px ${bl}55">${i + 1}</div>
            <p class="step-text">${p}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function fmt(n){
  if(n===null||n===undefined||isNaN(n)) return "—";
  if(n>=100) return n.toFixed(1);
  return n.toFixed(2);
}

function calcular(){
  const dosisMg = toMg(state.dosis, state.dosisUnit);
  if(!dosisMg||dosisMg<=0) return null;
  let contMg, volMl;
  if(state.tipo==="liquido"){
    contMg=toMg(state.contenido,state.contenidoUnit);
    volMl=parseFloat(state.volumen||0);
  } else {
    contMg=toMg(state.polvoContenido,state.polvoContenidoUnit);
    volMl=parseFloat(state.polvoDisolvente||0);
  }
  if(!contMg||contMg<=0||!volMl||volMl<=0) return null;
  const mlAdmin=(dosisMg*volMl)/contMg;
  return {dosisMg, contMg, volMl, mlAdmin, viales:dosisMg/contMg};
}

function makeParticles(){
  const c=el("particles"); c.innerHTML="";
  for(let i=0;i<28;i++){
    const d=document.createElement("div"); d.className="particle";
    d.style.cssText=`left:${(i*41+9)%100}%;top:${(i*57+13)%100}%;
      width:${(i%3)*.9+.4}px;height:${(i%3)*.9+.4}px;
      --dur:${((i%4)*1.3+2).toFixed(1)}s;--del:${((i%6)*.55).toFixed(1)}s;`;
    c.appendChild(d);
  }
}

function unitSelect(id, val, onChange){
  return `<select class="iselect" onchange="${onChange}">
    ${UNITS.map(u=>`<option value="${u}"${val===u?" selected":""}>${u}</option>`).join("")}
  </select>`;
}

function renderTipoBloque(bl, blt){
  return `
    <!-- Toggle tipo -->
    <div class="tipo-row">
      <button class="tipo-btn ${state.tipo==="liquido"?"active":""}"
        onclick="setState({tipo:'liquido'})"
        style="${state.tipo==="liquido"?`background:${bl}22;border-color:${blt};color:#fff`:""}">
        <span class="tipo-icon">💉</span>
        Liquido<br><small style="font-size:10px;opacity:.7">Ya viene diluido</small>
      </button>
      <button class="tipo-btn ${state.tipo==="polvo"?"active":""}"
        onclick="setState({tipo:'polvo'})"
        style="${state.tipo==="polvo"?`background:${bl}22;border-color:${blt};color:#fff`:""}">
        <span class="tipo-icon">🧪</span>
        Polvo<br><small style="font-size:10px;opacity:.7">Reconstituido</small>
      </button>
    </div>

    ${state.tipo==="liquido" ? `
      <div class="conc-vol">
        <div class="input-block" style="margin-bottom:0">
          <span class="input-label">Contenido total del vial</span>
          <div class="irow" style="border-color:${bl}44">
            <input id="contenido-input" type="number" placeholder="Ej: 1000" step="any" min="0"
              oninput="setState({contenido:this.value})"/>
            ${unitSelect("contUnit",state.contenidoUnit,"setState({contenidoUnit:this.value})")}
          </div>
        </div>
        <div class="input-block" style="margin-bottom:0">
          <span class="input-label">Volumen total del vial</span>
          <div class="irow" style="border-color:${bl}44">
            <input id="volumen-input" type="number" placeholder="Ej: 100" step="any" min="0"
              oninput="setState({volumen:this.value})"/>
            <span class="iunit">mL</span>
          </div>
        </div>
      </div>
      <div class="helper-text">
        💧 Paracetamol IV → <strong>1000 mg</strong> en <strong>100 mL</strong><br>
        💉 Tramadol → <strong>100 mg</strong> en <strong>2 mL</strong>
      </div>
    ` : `
      <div class="input-block">
        <span class="input-label">Contenido del frasco (polvo)</span>
        <div class="irow" style="border-color:${bl}44">
          <input id="polvo-contenido-input" type="number" placeholder="Ej: 1" step="any" min="0"
            oninput="setState({polvoContenido:this.value})"/>
          ${unitSelect("polvoUnit",state.polvoContenidoUnit,"setState({polvoContenidoUnit:this.value})")}
        </div>
      </div>
      <div class="input-block" style="margin-bottom:0">
        <span class="input-label">Lo disolviste / diluiste en</span>
        <div class="irow" style="border-color:${bl}44">
          <input id="polvo-disolvente-input" type="number" placeholder="Ej: 10" step="any" min="0"
            oninput="setState({polvoDisolvente:this.value})"/>
          <span class="iunit">mL</span>
        </div>
      </div>
      <div class="helper-text">
        🧪 Ceftriaxona 1g disuelto en <strong>10 mL</strong><br>
        🧪 Ampicilina 1g disuelto en <strong>5 mL</strong>
      </div>
    `}
  `;
}

function render(){
  const app=el("app");
  const res=calcular();
  const bl="#1976d2", blt="#42a5f5", cy="#00cae0";
  
  // Actualizar solo valores de inputs sin recrear el DOM
  const drugInput = el("drug-input");
  const dosisInput = el("dosis-input");
  
  // Si los inputs ya existen, solo actualizar valores (FIX: teclado no se cierra)
  if(drugInput && state.pestana === "dosis"){
    if(drugInput.value !== state.drugName) drugInput.value = state.drugName;
    if(dosisInput && dosisInput.value !== state.dosis) dosisInput.value = state.dosis;

    // FIX: si cambió el tipo (liquido <-> polvo), regenerar el bloque de presentacion completo
    const tipoContainer = el("tipo-container");
    if(tipoContainer){
      const tipoActual = tipoContainer.getAttribute("data-tipo");
      if(tipoActual !== state.tipo){
        tipoContainer.setAttribute("data-tipo", state.tipo);
        tipoContainer.innerHTML = renderTipoBloque(bl, blt);
      } else {
        if(el("contenido-input") && el("contenido-input").value !== state.contenido) el("contenido-input").value = state.contenido;
        if(el("volumen-input") && el("volumen-input").value !== state.volumen) el("volumen-input").value = state.volumen;
        if(el("polvo-contenido-input") && el("polvo-contenido-input").value !== state.polvoContenido) el("polvo-contenido-input").value = state.polvoContenido;
        if(el("polvo-disolvente-input") && el("polvo-disolvente-input").value !== state.polvoDisolvente) el("polvo-disolvente-input").value = state.polvoDisolvente;
      }
    }

    const resultContainer = el("result-container");
    if(resultContainer){
      resultContainer.innerHTML = res ? generarResultados(res, bl, blt, cy) : "";
    }
    return;
  }

  // Goteo: actualizar solo resultados sin tocar los inputs (FIX: teclado no se cierra)
  const goteoContainer = el("goteo-container");
  if(goteoContainer && state.pestana === "goteo"){
    // Si cambió el modo (tiempo <-> flujo), reconstruir todo el bloque
    const modoActual = goteoContainer.getAttribute("data-modo");
    if(modoActual !== state.goteoModo){
      goteoContainer.setAttribute("data-modo", state.goteoModo);
      goteoContainer.innerHTML = renderGoteo();
      return;
    }
    // Solo actualizar el bloque de resultados
    const goteoResult = el("goteo-result");
    if(goteoResult){
      const resG = calcularGoteo();
      goteoResult.innerHTML = renderGoteoResultado(resG, bl, blt, cy);
      return;
    }
    // Fallback: reconstruir todo
    goteoContainer.innerHTML = renderGoteo();
    return;
  }

  const vialedFull  = res ? Math.floor(res.viales) : 0;
  const pct         = res ? Math.min(res.viales*100,100) : 0;

  app.innerHTML=`
    <!-- HEADER -->
    <div class="header">
      <div class="badge-row">
        <span class="badge">MEDISHORT360</span>
        <span class="badge">Calculo IV</span>
        <span class="badge">Regla de Tres</span>
      </div>
      <div class="logo-wrap">
        <div class="logo-ring-spin"></div>
        <div class="logo-ring-pulse"></div>
        <img src="${LOGO_B64}" alt="MEDISHORT360" class="logo-img"/>
      </div>
      <div class="app-title">MEDISHORT360</div>
      <div class="app-sub">Cálculo IV · Enfermería</div>
      <div class="app-brand">📺 Canal MEDISHORT360</div>
    </div>

    <!-- TABS -->
    <div style="display:flex;gap:10px;margin-bottom:18px">
      <button onclick="setState({pestana:'dosis'})"
        style="flex:1;padding:13px 8px;border-radius:14px;border:2px solid ${state.pestana==='dosis'?blt:bl+'44'};
               background:${state.pestana==='dosis'?bl+'33':'transparent'};color:${state.pestana==='dosis'?'#fff':'#90caf9'};
               font-size:14px;font-weight:${state.pestana==='dosis'?'700':'400'};cursor:pointer;transition:all .2s">
        💉 Dosis en mL
      </button>
      <button onclick="setState({pestana:'goteo'})"
        style="flex:1;padding:13px 8px;border-radius:14px;border:2px solid ${state.pestana==='goteo'?blt:bl+'44'};
               background:${state.pestana==='goteo'?bl+'33':'transparent'};color:${state.pestana==='goteo'?'#fff':'#90caf9'};
               font-size:14px;font-weight:${state.pestana==='goteo'?'700':'400'};cursor:pointer;transition:all .2s">
        💧 Cálculo de Goteo
      </button>
    </div>

    ${state.pestana === 'dosis' ? `
    <!-- SECCION 1: PRESCRIPCION -->
    <div class="card" style="border-color:${bl}55;box-shadow:0 0 16px ${bl}15">
      <div class="card-label">📋 Prescripcion medica</div>

      <div class="input-block">
        <span class="input-label">Medicamento (opcional)</span>
        <div class="irow" style="border-color:${bl}44">
          <input id="drug-input" type="text" placeholder="Ej: Ceftriaxona, Paracetamol IV..."
            oninput="setState({drugName:this.value})"/>
        </div>
      </div>

      <div class="input-block" style="margin-bottom:0">
        <span class="input-label">Dosis prescrita</span>
        <div class="irow" style="border-color:${bl}44">
          <input id="dosis-input" type="number" placeholder="Ej: 650" step="any" min="0"
            oninput="setState({dosis:this.value})"/>
          ${unitSelect("dosisUnit", state.dosisUnit, "setState({dosisUnit:this.value})")}
        </div>
      </div>
    </div>

    <!-- SECCION 2: PRESENTACION -->
    <div class="card" style="border-color:${bl}55;box-shadow:0 0 16px ${bl}15">
      <div class="card-label">💊 Presentacion del medicamento</div>

      <div class="card-label" style="margin-bottom:6px">⚡ Acceso rapido:</div>
      <div class="presets-row">
        ${PRESETS.map(p=>`
          <button class="preset-btn"
            onclick="applyPreset(${JSON.stringify(p).replace(/"/g,"'")})">
            ${p.label}
          </button>
        `).join("")}
      </div>

      <div class="divider">o ingresa manualmente</div>
      <div style="height:14px"></div>

      <div id="tipo-container" data-tipo="${state.tipo}">
        ${renderTipoBloque(bl, blt)}
      </div>
    </div>

    <!-- RESULTADOS DINAMICOS -->
    <div id="result-container">
      ${generarResultados(res, bl, blt, cy)}
    </div>
    ` : `
    <!-- PESTAÑA GOTEO -->
    <div id="goteo-container" data-modo="${state.goteoModo}">
      ${renderGoteo()}
    </div>
    `}

    <!-- FOOTER -->
    <div class="footer">
      <p>Solo para referencia clinica &middot; Verificar con prescripcion original</p>
      <strong>🩺 MEDISHORT360 &middot; Canal Medico Educativo</strong>
    </div>
  `;
}

/* ====================================================
   MODULO GOTEO IV
   ==================================================== */

function calcularGoteo(){
  const vol    = parseFloat(state.goteoVol    || 0);
  const factor = parseFloat(state.goteoFactor || 20);

  if(state.goteoModo === "tiempo"){
    const flujo = parseFloat(state.goteoFlujo || 0);
    if(!vol||vol<=0||!flujo||flujo<=0) return null;
    const tiempoH   = vol / flujo;
    const tiempoMin = tiempoH * 60;
    const horas     = Math.floor(tiempoH);
    const minutos   = Math.round((tiempoH - horas) * 60);
    const macroGtt  = Math.round((vol * factor) / tiempoMin);
    const microGtt  = Math.round((vol * 60)     / tiempoMin);
    let horaFin = null;
    if(state.goteoInicio){
      const [hh,mm] = state.goteoInicio.split(":").map(Number);
      const total   = hh*60 + mm + Math.round(tiempoMin);
      horaFin = `${String(Math.floor(total/60)%24).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
    }
    return {modo:"tiempo", vol, flujo, factor, tiempoH, horas, minutos, macroGtt, microGtt, horaFin};

  } else {
    const hd  = parseFloat(state.goteoHoras   || 0);
    const md  = parseFloat(state.goteoMinutos || 0);
    const tiempoMin = hd*60 + md;
    if(!vol||vol<=0||tiempoMin<=0) return null;
    const flujo    = parseFloat((vol/(tiempoMin/60)).toFixed(2));
    const macroGtt = Math.round((vol * factor) / tiempoMin);
    const microGtt = Math.round((vol * 60)     / tiempoMin);
    const horas    = Math.floor(tiempoMin/60);
    const minutos  = tiempoMin % 60;
    let horaFin = null;
    if(state.goteoInicio){
      const [hh,mm] = state.goteoInicio.split(":").map(Number);
      const total   = hh*60 + mm + tiempoMin;
      horaFin = `${String(Math.floor(total/60)%24).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
    }
    return {modo:"flujo", vol, flujo, factor, tiempoMin, horas, minutos, macroGtt, microGtt, horaFin};
  }
}

function renderGoteoResultado(res, bl, blt, cy){
  if(!res) return `
    <div style="background:${bl}11;border:1px solid ${bl}33;border-radius:14px;padding:20px;text-align:center;color:var(--muted);font-size:13px">
      ⚕️ Completa los campos para ver el cálculo automático
    </div>`;

  const fStr = res.horas+"h "+(res.minutos>0?res.minutos+"min":"0min");
  const resumenClinico = res.modo==="tiempo"
    ? `Para administrar ${res.vol} mL a una velocidad de ${res.flujo} mL/h, la infusión tendrá una duración aproximada de ${fStr}. Utilizando un macrogotero de ${res.factor} gotas/mL deberá regularse a ${res.macroGtt} gotas por minuto. Con microgotero deberá regularse a ${res.microGtt} microgotas por minuto.`
    : `Para administrar ${res.vol} mL en ${fStr}, se necesita un flujo de ${res.flujo} mL/h. Con macrogotero de ${res.factor} gotas/mL: ${res.macroGtt} gotas/min. Con microgotero: ${res.microGtt} microgotas/min.`;

  return `
    <div class="result-card" style="border-color:${blt}66;box-shadow:0 0 28px ${bl}28">
      <div class="card-label" style="margin-bottom:14px">📊 Resultados</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div style="background:${bl}18;border:1px solid ${bl}44;border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">⏱ Tiempo total</div>
          <div style="font-size:24px;font-weight:700;color:${cy}">${res.horas}<span style="font-size:13px;color:${blt}">h</span> ${res.minutos}<span style="font-size:13px;color:${blt}">min</span></div>
        </div>
        <div style="background:${bl}18;border:1px solid ${bl}44;border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">💧 ${res.modo==="flujo"?"Flujo necesario":"Flujo"}</div>
          <div style="font-size:24px;font-weight:700;color:${cy}">${res.flujo}<span style="font-size:13px;color:${blt}"> mL/h</span></div>
        </div>
        <div style="background:${bl}18;border:1px solid ${bl}44;border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">🩸 Macrogotas</div>
          <div style="font-size:24px;font-weight:700;color:#4fc3f7">${res.macroGtt}<span style="font-size:12px;color:${blt}"> gtt/min</span></div>
          <div style="font-size:10px;color:var(--muted)">(${res.factor} gotas/mL)</div>
        </div>
        <div style="background:${bl}18;border:1px solid ${bl}44;border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">💦 Microgotas</div>
          <div style="font-size:24px;font-weight:700;color:#4fc3f7">${res.microGtt}<span style="font-size:12px;color:${blt}"> gtt/min</span></div>
          <div style="font-size:10px;color:var(--muted)">(60 gotas/mL)</div>
        </div>
      </div>
      ${res.horaFin ? `
        <div style="background:linear-gradient(135deg,${bl}33,${bl}11);border:1px solid ${blt}55;border-radius:12px;padding:14px;text-align:center;margin-bottom:14px">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">🏁 Hora estimada de finalización</div>
          <div style="font-size:40px;font-weight:800;color:${cy};letter-spacing:3px">${res.horaFin}</div>
          <div style="font-size:11px;color:var(--muted)">Inicio ${state.goteoInicio} + ${res.horas}h ${res.minutos}min</div>
        </div>
      ` : ""}
      <div class="steps-card" style="border-color:${blt};background:linear-gradient(135deg,#0b1a30,#040c1f);box-shadow:0 0 24px ${bl}33">
        <div class="steps-title" style="color:${blt}"><span>📋</span> Resumen clínico</div>
        <p style="color:#b0c4de;font-size:13px;line-height:1.7;margin:0;padding:0 4px">${resumenClinico}</p>
      </div>
    </div>`;
}

function renderGoteo(){
  const bl="#1976d2", blt="#42a5f5", cy="#00cae0";
  const g   = state.goteoModo;
  const res = calcularGoteo();

  const factorOpts = ["10","15","20","60"].map(f=>
    `<option value="${f}"${state.goteoFactor===f?" selected":""}>${f} gotas/mL${f==="60"?" (microgotero)":""}</option>`
  ).join("");

  const volPresets   = [250,500,1000,1500,2000];
  const flujoPresets = [60,80,100,125,150,250];

  return `
    <div class="card" style="border-color:${bl}55;box-shadow:0 0 16px ${bl}15;margin-bottom:14px">
      <div class="card-label" style="font-size:16px;margin-bottom:12px">💧 Cálculo de Goteo IV</div>
      <div style="color:var(--muted);font-size:12px;margin-bottom:16px">Calcula flujo, tiempo y gotas por minuto</div>

      <!-- MODOS -->
      <div class="tipo-row" style="margin-bottom:18px">
        <button class="tipo-btn ${g==="tiempo"?"active":""}"
          onclick="setState({goteoModo:'tiempo'})"
          style="${g==="tiempo"?`background:${bl}22;border-color:${blt};color:#fff`:""}">
          <span class="tipo-icon">⏱️</span>
          Calcular Tiempo<br><small style="font-size:10px;opacity:.7">Vol + Flujo dados</small>
        </button>
        <button class="tipo-btn ${g==="flujo"?"active":""}"
          onclick="setState({goteoModo:'flujo'})"
          style="${g==="flujo"?`background:${bl}22;border-color:${blt};color:#fff`:""}">
          <span class="tipo-icon">🔢</span>
          Calcular Flujo<br><small style="font-size:10px;opacity:.7">Vol + Tiempo dados</small>
        </button>
      </div>

      <!-- VOLUMEN -->
      <div class="input-block">
        <span class="input-label">Volumen total (mL)</span>
        <div class="irow" style="border-color:${bl}44">
          <input type="number" placeholder="Ej: 1000" step="any" min="0"
            value="${state.goteoVol}" oninput="setState({goteoVol:this.value})"/>
          <span class="iunit">mL</span>
        </div>
      </div>
      <div class="presets-row" style="margin-bottom:14px">
        ${volPresets.map(v=>`<button class="preset-btn"
          onclick="setState({goteoVol:'${v}'})">${v}</button>`).join("")}
      </div>

      ${g==="tiempo" ? `
        <!-- FLUJO -->
        <div class="input-block">
          <span class="input-label">Flujo (mL/h)</span>
          <div class="irow" style="border-color:${bl}44">
            <input type="number" placeholder="Ej: 125" step="any" min="0"
              value="${state.goteoFlujo}" oninput="setState({goteoFlujo:this.value})"/>
            <span class="iunit">mL/h</span>
          </div>
        </div>
        <div class="presets-row" style="margin-bottom:14px">
          ${flujoPresets.map(f=>`<button class="preset-btn"
            onclick="setState({goteoFlujo:'${f}'})">${f}</button>`).join("")}
        </div>
      ` : `
        <!-- TIEMPO DESEADO -->
        <div class="input-block">
          <span class="input-label">Tiempo deseado</span>
          <div style="display:flex;gap:10px">
            <div class="irow" style="border-color:${bl}44;flex:1">
              <input type="number" placeholder="Horas" step="1" min="0"
                value="${state.goteoHoras}" oninput="setState({goteoHoras:this.value})"/>
              <span class="iunit">h</span>
            </div>
            <div class="irow" style="border-color:${bl}44;flex:1">
              <input type="number" placeholder="Min" step="1" min="0" max="59"
                value="${state.goteoMinutos}" oninput="setState({goteoMinutos:this.value})"/>
              <span class="iunit">min</span>
            </div>
          </div>
        </div>
      `}

      <!-- FACTOR DE GOTEO -->
      <div class="input-block">
        <span class="input-label">Factor de goteo</span>
        <div class="irow" style="border-color:${bl}44">
          <select class="iselect" style="flex:1;background:transparent;color:#fff;border:none;padding:4px;font-size:15px"
            onchange="setState({goteoFactor:this.value})">${factorOpts}</select>
        </div>
      </div>

      <!-- HORA DE INICIO -->
      <div class="input-block" style="margin-bottom:0">
        <span class="input-label">Hora de inicio <span style="opacity:.5">(opcional)</span></span>
        <div class="irow" style="border-color:${bl}44">
          <input type="time" value="${state.goteoInicio}"
            style="flex:1;background:transparent;color:#fff;border:none;font-size:16px;padding:4px"
            oninput="setState({goteoInicio:this.value})"/>
        </div>
      </div>
    </div>

    <!-- RESULTADOS GOTEO -->
    <div id="goteo-result">
      ${renderGoteoResultado(res, bl, blt, cy)}
    </div>

    <!-- ACCESOS RÁPIDOS COMBINADOS -->
    <div class="card" style="border-color:${bl}44;margin-top:12px">
      <div class="card-label" style="margin-bottom:8px">⚡ Combinaciones frecuentes</div>
      <div class="presets-row">
        ${[
          {v:500,  f:125, l:"500 mL\n125 mL/h"},
          {v:1000, f:125, l:"1000 mL\n125 mL/h"},
          {v:1000, f:100, l:"1000 mL\n100 mL/h"},
          {v:1500, f:125, l:"1500 mL\n125 mL/h"},
        ].map(p=>`<button class="preset-btn" style="white-space:pre-line;line-height:1.4"
          onclick="setState({goteoVol:'${p.v}',goteoFlujo:'${p.f}',goteoModo:'tiempo'})">${p.l}</button>`).join("")}
      </div>
    </div>

    <div style="background:${bl}0d;border:1px solid ${bl}33;border-radius:10px;padding:12px 16px;margin-top:4px;color:#90caf9;font-size:12px">
      💡 Consejo: Verifica siempre la prescripción médica y las indicaciones del protocolo.
    </div>
  `;
}

window.applyPreset = function(p){
  setState({
    tipo:              p.tipo,
    contenido:         p.tipo==="liquido" ? String(p.contenido) : "",
    contenidoUnit:     p.tipo==="liquido" ? p.contUnit : "mg",
    volumen:           p.tipo==="liquido" ? String(p.volumen) : "",
    polvoContenido:    p.tipo==="polvo"   ? String(p.contenido) : "",
    polvoContenidoUnit:p.tipo==="polvo"   ? p.contUnit : "g",
    polvoDisolvente:   "",
    drugName:          p.label,
  });
};

/* SW gestionado por la app maestra MS360 — registro local desactivado */

document.addEventListener("DOMContentLoaded",()=>{ makeParticles(); render(); });
